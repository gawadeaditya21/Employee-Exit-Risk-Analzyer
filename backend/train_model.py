import os
import pandas as pd
import joblib
from sklearn.model_selection import train_test_split
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report

def train_exit_risk_model():
    # 1. LOAD DATASET
    print("Loading HR dataset...")
    data_path = os.path.join("data", "aug_train.csv") if os.path.exists(os.path.join("data", "aug_train.csv")) else "aug_train.csv"
    df = pd.read_csv(data_path)
    
    # Remove enrollee_id because unique IDs do not help predict exit risk
    df = df.drop(columns=['enrollee_id'])
    
    # Separate input features (X) and target label (y)
    X = df.drop(columns=['target'])
    y = df['target']
    
    # 2. DEFINE COLUMN GROUPS FOR PREPROCESSING
    numeric_cols = ['city_development_index', 'training_hours']
    categorical_cols = [
        'gender', 'relevent_experience', 'enrolled_university', 
        'education_level', 'major_discipline', 'experience', 
        'company_size', 'company_type', 'last_new_job', 'city'
    ]
    
    # 3. CREATE PREPROCESSING PIPELINES
    # Numeric pipeline: fill missing values with median, then scale
    numeric_transformer = Pipeline(steps=[
        ('imputer', SimpleImputer(strategy='median')),
        ('scaler', StandardScaler())
    ])
    
    # Categorical pipeline: fill missing values with most frequent category, then One-Hot Encode
    categorical_transformer = Pipeline(steps=[
        ('imputer', SimpleImputer(strategy='most_frequent')),
        ('onehot', OneHotEncoder(handle_unknown='ignore'))
    ])
    
    # Combine numerical and categorical transformers
    preprocessor = ColumnTransformer(transformers=[
        ('num', numeric_transformer, numeric_cols),
        ('cat', categorical_transformer, categorical_cols)
    ])
    
    # 4. SPLIT DATA (80% Training, 20% Testing)
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42, stratify=y
    )
    
    # 5. DEFINE & TRAIN RANDOM FOREST MODEL
    rf_pipeline = Pipeline(steps=[
        ('preprocessor', preprocessor),
        ('classifier', RandomForestClassifier(n_estimators=100, random_state=42, class_weight='balanced'))
    ])
    
    print("Training Random Forest model...")
    rf_pipeline.fit(X_train, y_train)
    
    # Evaluate performance on test data
    rf_preds = rf_pipeline.predict(X_test)
    accuracy = accuracy_score(y_test, rf_preds) * 100
    print(f"\nRandom Forest Accuracy: {accuracy:.2f}%")
    print("\nDetailed Performance Report:\n", classification_report(y_test, rf_preds))
    
    # 6. SAVE MODEL FILE FOR BACKEND
    os.makedirs("saved_models", exist_ok=True)
    save_path = os.path.join("saved_models", "random_forest_model.joblib")
    joblib.dump(rf_pipeline, save_path)
    print(f"\nModel saved successfully at: {save_path}")

if __name__ == "__main__":
    train_exit_risk_model()
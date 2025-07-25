import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.svm import SVC
from sklearn.preprocessing import LabelEncoder
import joblib

# 1. Load dataset
df = pd.read_csv("student_lifestyle_dataset.csv")

# 2. Encode target (Stress_Level)
label_encoder = LabelEncoder()
df['Stress_Level'] = label_encoder.fit_transform(df['Stress_Level'])
# Label mapping (for info): print(dict(zip(label_encoder.classes_, label_encoder.transform(label_encoder.classes_))))

# 3. Feature selection
X = df.drop(columns=['Student_ID', 'Stress_Level'])  # Feature columns
y = df['Stress_Level']                               # Target column

# 4. Split data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# 5. Train SVM model
model = SVC(kernel='rbf', probability=True)
model.fit(X_train, y_train)

# 6. Evaluate
acc = model.score(X_test, y_test)
print(f"Model trained. Accuracy: {acc:.2%}")

# 7. Save model and encoder
joblib.dump(model, "stress_model.pkl")
joblib.dump(label_encoder, "label_encoder.pkl")
print("Model and encoder saved successfully.")

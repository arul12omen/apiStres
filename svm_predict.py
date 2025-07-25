import sys
import numpy as np
import pandas as pd
import joblib

try:
    model = joblib.load("stress_model.pkl")
    encoder = joblib.load("label_encoder.pkl")

    # Read args
    args = list(map(float, sys.argv[1:]))
    data = np.array(args).reshape(1, -1)

    # Create dataframe with feature names to avoid warning
    df_input = pd.DataFrame(data, columns=[
        "Study_Hours_Per_Day", "Extracurricular_Hours_Per_Day",
        "Sleep_Hours_Per_Day", "Social_Hours_Per_Day",
        "Physical_Activity_Hours_Per_Day", "GPA"
    ])

    # Predict
    pred = model.predict(df_input)
    label = encoder.inverse_transform(pred)[0]
    print(label)

except Exception as e:
    print(f"Error: {e}", file=sys.stderr)
    exit(1)

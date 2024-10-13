# Plant Leaves Disease Detection
Web based advisory for identification and management of insect pest in agricultural crops Info

This project was made during BHU B.Sc. CS (Hons) sem 6 project.

## About
In this project user can upload photo of a plant leaf and our model will tell the diesease present in it (if any) using CNN. Also for further query user can login to our website and ask quries to us.

This model can identify 5 classes for Disease Detection and 24 classes for Disease Classification.

- Disease Classification Classes
    - Apple___Apple_scab
    - Apple___Black_rot
    - Apple___Cedar_apple_rust
    - Apple___healthy
    - Blueberry___healthy
    - Cherry___healthy
    - Cherry___Powdery_mildew
    - Grape___Black_rot
    - Grape___Esca_Black_Measles
    - Grape___healthy
    - Grape___Leaf_blight_Isariopsis_Leaf_Spot
    - Orange___Haunglongbing
    - Peach___Bacterial_spot
    - Peach___healthy
    - Pepper,_bell___Bacterial_spot
    - Pepper,_bell___healthy
    - Potato___Early_blight
    - Potato___healthy
    - Raspberry___healthy
    - Soybean___healthy
    - Squash___Powdery_mildew
    - Strawberry___healthy
    - Strawberry___Leaf_scorch

- Disease Detection Classes
    - Cherry___healthy
    - Cherry___Powdery_mildew
    - Grape___Black_rot
    - Grape___Esca_Black_Measles
    - Grape___healthy
    - Grape___Leaf_blight_Isariopsis_Leaf_Spot

## How to run?
* Go to **plant_disease_detection**
```powershell
    cd .\plant_disease_detection\
```

* Creating Virtual Environment
```powershell
    python -m venv env 
```

* Activating Virtual Environment
```powershell
    .\env\Scripts\activate
```

* Installing files from **requirement.txt**
```powershell
    pip install -r requirements.txt
```

* Running `streamlit` file
```powershell
    streamlit run app.py
```

---

* Open new terminal and installing frontend dependencies:
```powershell
    npm i
```

* Now go to **backend** folder and install it's dependencies
```powershell
    cd .\backend\
    npm i
```

* Running the Web Portal:
```powershell
    npm run both
```

## Group Members

* Suraj Kumar Yadav
* Abhishek Rao
* Pushkar
* Shashwat
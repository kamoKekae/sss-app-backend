# Routes
    Routes are split up by routers and each router defines its own endpoints

## 1) Check list router
    This router is used to query the checklist Table and its associated tables

    Endpoints:
    - /checklist/retrieve : GET endpoint ? queryParameter = [studentNumber]

    -/checklist/insert    : POST endpoint ? Expects json body with JSONOBjects = [courseName, ,deadline,visibility, topic , items ] : topic is checklist topic, items is checklist items as Strings



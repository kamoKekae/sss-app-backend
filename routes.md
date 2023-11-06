# Routes
    Routes are split up by routers and each router defines its own endpoints, The request body is only parsed if the endpoint is a POST endpoint

## 1) Check list router
    This router is used to query the checklist Table and its associated tables

    ### Endpoints:

    #### /checklist/retrieve : GET endpoint ? queryParameter = [studentNumber]
     RETURN VALUE : JSONArray with JSONObjects
    - JSON Object properties : topic, items_array ,course_name , deadline,visibility 
    - Items is an array of all items belonging to the topic in the course

    #### /checklist/insert    : POST endpoint ? Expects json body with JSONOBjects = [courseName, ,deadline,visibility, topic , items ] : topic is checklist topic, items is checklist items as Strings

    #### /checklist/completed : GET ENDPOINT
    - Used to update the database when a student has completed a certain checklist  
    - Query PARAMETERS : studentNumber, courseName , topic
    - Request body not parsed
    - RETURN : JSON OBject with false if not successful and an error message or true and a positive message otherwise

    #### /checklist/delete : GET ENDPOINT
    - Used to delete checklist and its items
    - Query Parameter : topic , courseName



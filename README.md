# react-bard-palm2
React app uses bard and palm2



PALM2:
    Pathways Language Model - PALM2
    https://ai.google/discover/palm2/


Requirement:
    google account

    https://developers.generativeai.google/products/makersuite

    curl \
-H 'Content-Type: application/json' \
-d '{ "prompt": { "text": "Write a story about a magic backpack"} }' \
"https://generativelanguage.googleapis.com/v1beta3/models/text-bison-001:generateText?key=YOUR_API_KEY"



To Setup:
Server /
    npm install google-auth-library
    npm install @google-ai/generativelanguage
    npm install dotenv

    export API_KEY="xxxxxxxxxxxx"
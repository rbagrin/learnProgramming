module.exports = {
    URLS: {
        BASE_REQUEST_URL: 'http://localhost:5000',

        // USER Constants
        USER_URL: 'http://localhost:5000/users/',
        LOGIN_URL: 'http://localhost:5000/users/login/',
        REGISTER_URL: 'http://localhost:5000/users/register/',

        // ROUTES Constants
        FAQS_URL: 'http://localhost:5000/faqs/',
        USERS_URL: 'http://localhost:5000/users/',
        QUESTIONS_URL: 'http://localhost:5000/questions/'
    },
    DEFINITIONS: {
        IF: `// Instrucțiunea if-else (dacă-altfel) este folosită 
 // pentru a exprima decizii.
 // Sintaxa instrucțiunii if-else arata așa:
        
 //  if (expression) 
 //      statement1
 //  else
 //      statement2

 // EXEMPLU:

 if (n % 2 == 0) { // '%' reprezintă restul împărțirii lui n la 2
    console.log(n + " este număr par.");
 } else {
    console.log(n + " este număr impar.");
 }
         
 // unde partea cu else este opțională.
 // Dacă expresia este evaluată ca fiind adevărată se execută statement1, altfel se execută statement2.`,
        FOR: `// Instrucțiunea repetitvă for (pentru)...`,
        WHILE: `// Instrucțiunea repetitivă while (cât timp)...`,
        ADVANCED: `// Instrucțiunile pot fi combinate...`
    }
};
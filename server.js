const express = require('express');
const hbs = require('hbs');
const fs = require('fs');


var app = express();                        //This creates the application

//Set up for use of Partials
hbs.registerPartials(__dirname + '/views/partials');
//Set various express data required by HandleBarService
app.set('view engine', 'hbs');

//Register more MIDDLEWARE
//NOTE: next is use to tell when middleware software is done
app.use((req, res, next) =>
{
    var now = new Date().toString();
    var log = `${now}: ${req.method}, ${req.url}`;

    console.log(log);

    fs.appendFile('server.log',log + '\n', (err) =>
    {
        if (err)
            console.log('Unable to append to server.log');
    });

    next();             //Execution of browser cannot continue without this!!!
});

// app.use((req, res, next) =>
// {
//     res.render('maintenance.hbs');
// });


app.use(express.static(__dirname + '/public'));

//Register the following so it can be reused on multiple pages (Called HELPERS)
//NOTE: The name registered must match name used in HBS files.
hbs.registerHelper('getCurrentYear', () =>
{
   return new Date().getFullYear()
});

hbs.registerHelper('streamIt', (text) =>
{
    return  text.toUpperCase()
});

app.get('/', (req, res) =>
{
    // res.send('<h1>Hello Express</h1>');
    // res.send(
    //     {
    //         name: 'Al',
    //         likes: 
    //         [
    //             'God',
    //             'Paulette',
    //             'Mystic',
    //             'Vesper'
    //         ]
    //     });
    res.render('home.hbs',
    {
        tabTitle:   'HOME PAGE',
        pageTitle:  'Home Page title',
        welcomeMessage: 'Welcome To The Hotel California'
    });
    }
);

app.get('/about', (req, res) =>
    {
        // res.send('About Page!');
        //Render  uses templates setup for view engine
        res.render('about.hbs', 
        {
            tabTitle:   'About Page',
            pageTitle:  'New About Page title'
        });
    }
);

// app.get('/maintenance', (req, res) =>
//     {
//         res.render('maintenance.hbs', 
//         {
//             tabTitle:   'Maintenance Page',
//             pageTitle:  'Page maintenance is in progress'
//         });
//     }
// );

app.get('/bad', (req, res) =>
    {
        res.send(
            {
            errorMessage: 'Danger, Will Robinson'
            });
    }
);

//Bind the application to a port on our machine.  The 2nd optional argument is the function that is activated when the page is activated
app.listen(8080, () =>
{
    console.log('Server is up on port 8080');
});
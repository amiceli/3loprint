# 3loprint

3loprint is a VueJS application for print your trello cards in postits.

It generate PDF file with your trello access.

**3loprint does not save your information. It uses Pouch DB, you can delete it when you want**.

## Technologies

3loprint is built with [VueJS](https://vuejs.org/), [PouchDB](https://pouchdb.com/) and [klein.php](https://github.com/klein/klein.php).

3loprint interfaces is built with [element ui library](http://element.eleme.io/#/en-US).

## Development environment

Clone 3loprint repository : 

    git clone https://github.com/amiceli/3loprint.git
    
Install JS dependencies : 

    cd app
    npm install
    
And run webpack-dev-server : 

    npm run build
    
Install PHP dependencies : 

    cd server
    composer install
    
Now run server with PHP built in server : 

    php -S 127.0.0.1:8000 -t ./
    
You open [http://localhost:8080](http://localhost:8080) in your favorite browser.

## Production environment

**I'm still working on it**.

## Future development

 - Print task (trello checklist). Currently 3loprint only print user story (trello card).
 - Save printed task, I think it can be useful, no ?
 - Create a nginx conf for production environment.
 - Create a deployment procedure.
 
### You have an idea, create a issue !
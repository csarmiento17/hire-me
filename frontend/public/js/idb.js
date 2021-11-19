// create variable to hold db connection
let db;
// establish a connection to IndexedDB database called 'hireme' and set it to version 1
const request = indexedDB.open('hireme', 1);

// this event will emit if the database version changes (non-exist to version 1, v1 to v2, etc.)
request.onupgradeneeded = function(event) {
    // save a reference to the database 
    const db = event.target.result;
    // create an object store (table) called `new_hire`, set it to have an auto incrementing primary key of sorts 
    db.createObjectStore('new_hire', { autoIncrement: true });
  };

// upon success
request.onsuccess = function(event) {
    // when db is successfully created with its object store (from onupgradedneeded() event above) or simply established a connection, save reference to db in global variable
    db = event.target.result;
  
    // check if app is online, if yes run uploadData() function to send all local db data to api
    if (navigator.onLine) {
      uploadData();
    }
  };

// upon error
request.onerror = function(event) {
    // log error here
    console.log(event.target.errorCode);
  };

// This function will be executed if we attempt to submit a new budget and there's no internet connection
// Will be used in the index.js file's form submission function if the fetch() function's .catch() method is executed.
// which the fetch() function's .catch() method is only executed on network failure!
function saveRecord(record) {
    // open a new transaction with the database with read and write permissions 
    const transaction = db.transaction(['new_hire'], 'readwrite');
  
    // access the object store for `new_hire`
    const jobObjectStore = transaction.objectStore('new_hire');
  
    // add record to your store with add method
    jobObjectStore.add(record);
  }

function uploadData() {
    // open a transaction on your db
    const transaction = db.transaction(['new_hire'], 'readwrite');
  
    // access your object store
    const jobObjectStore = transaction.objectStore('new_hire');
  
    // get all records from store and set to a variable
    // it doesn't automatically receive the data from the new_hire object store
    // attach .getAll() asynchronous function as an event handler to retrieve the data. 
    const getAll = jobObjectStore.getAll();
  
    // upon a successful .getAll() execution, run this getAll.onsuccess() event 
    // the getAll variable created above will have a '.result' property that's an array of all the data retrieved from the new_hire object store
    getAll.onsuccess = function() {
        // if there was data in indexedDb's store, let's send it to the api server
        if (getAll.result.length > 0) {
        // the Mongoose .create() method we use to create a budget can handle either single objects or an array of objects, 
        // so no need to create another route/controller method to handle this one event.
        fetch('/api/transaction', {
            method: 'POST',
            body: JSON.stringify(getAll.result),
            headers: {
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(serverResponse => {
            if (serverResponse.message) {
                throw new Error(serverResponse);
            }
            // open one more transaction
            const transaction = db.transaction(['new_hire'], 'readwrite');
            // access the new_hire object store
            const jobObjectStore = transaction.objectStore('new_hire');
            // clear all items in your store
            jobObjectStore.clear();

            alert('All saved job has been submitted!');
            })
            .catch(err => {
            console.log(err);
            });
        }
  };
  }

// listen for app coming back online
window.addEventListener('online', uploadData);
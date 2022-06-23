const express = require('express');
const app = express();

app.use(express.static('abc'));


let dbparams ={
	host: 'localhost',
    user: 'root',
    password: 'cdac',
    database: 'surajDb',
	port:3306
}
const mysql = require('mysql2');
const conn = mysql.createConnection(dbparams);


app.get('/getbook', (req, res) => {
        console.log("reading input " + req.query.x);
	
	let bookid = req.query.x;
	// let bookid = 101;
	let output = { bookfoundstatus:false ,bookdetails:{bookid:bookid ,bookname:"" ,price:""}};
	
	conn.query('select * from books where bookid=?',[bookid],(error,rows) =>{
		if (error) {
			console.log("some error occured " + error);
        } else {
			if(rows.length > 0 ){
			console.log(rows[0].bookid +"  "+ rows[0].bookname +"  " +rows[0].price);
			output.bookfoundstatus = true;
			output.bookdetails.bookname = rows[0].bookname;
			output.bookdetails.price = rows[0].price;
			}
			else
			console.log("book not found with bookid" + bookid);
        }
        res.send(output);
	})

		});


		app.get('/updatebook', (req, res) => {
			console.log("reading input " + req.query.bookid,req.query.pice);
		
		let input = {bookid:req.query.bookid , price:req.query.price}
		let output = { bookupdatestatus:false };
		
		conn.query('update books set price =? where bookid =?',[input.price, input.bookid],(error,result) =>{
			if (error) {
				console.log("some error occured " + error);
			} else {
				if(result.affectedRows >0){
				output.bookupdatestatus = true;
				}
				else
				console.log("book not update with bookid" + input.bid);
			}
			res.send(output);
		})
	
			});




app.listen(8000, function () {
    console.log("server listening at port 8000...");
});

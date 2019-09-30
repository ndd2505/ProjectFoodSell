
const express = require('express')
const app = express()
const morgan = require('morgan')
const mysql = require('mysql')
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended: false}))

app.use(morgan("short"))

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    port: "3306",
    password: "250599duy",
    database: "testuser"
})

app.get('/users', (req,res)=>{
    const offset = req.query.offset
    const max = req.query.max
    const orderby = req.query.orderby
    const sort = req.query.sort
    const searchobj ='%'+ req.query.search +'%'

    if(req.query.search==null || req.query.search=='')
    {
    if(offset==null, max==null){
            connection.query("Select * from usertab ORDER BY id asc",(err, rows) =>{
        if (err){
            console.log('failedddd', err)
        }else{
            console.log("Success fetch MySQL")
        }
            res.json(rows)
    })
    }//pagination
    else{
    if(orderby==null){    
        connection.query("Select * from usertab ORDER BY id ASC limit ?,?",[parseInt(offset), parseInt(max)], (err, rows) =>{
        if (err){
            console.log('failedddd', err)
        }else{
            console.log("Success fetch MySQL")
        }
            res.json(rows)
    })//sort
    }else{
        if(sort==null){
            connection.query("Select * from usertab ORDER BY "+ orderby +" ASC limit ?,?",[parseInt(offset), parseInt(max)], (err, rows) =>{
            if (err){
                console.log('failedddd', err)
            }else{
                console.log("Success fetch MySQL")
            }
                res.json(rows)
            })  
        }else{
            connection.query("Select * from usertab ORDER BY "+ orderby +" "+sort+" limit ?,?",[parseInt(offset), parseInt(max)], (err, rows) =>{
            if (err){
                console.log('failedddd', err)
            }else{
                console.log("Success fetch MySQL")
            }
                res.json(rows)
            }) 
        }  
    }
    }
    }//search
    else{
        if(offset==null, max==null){
            connection.query("SELECT * from usertab where username or hoten like ? ORDER BY id asc",searchobj,(err, rows) =>{
        if (err){
            console.log('failedddd', err)
        }else{
            console.log("Success fetch MySQL")
        }
            res.json(rows)
    })
    }//pagination
    else{
    if(orderby==null){    
        connection.query("SELECT * from usertab where username or hoten like ? ORDER BY id ASC limit ?,?",[searchobj,parseInt(offset), parseInt(max)], (err, rows) =>{
        if (err){
            console.log('failedddd', err)
        }else{
            console.log("Success fetch MySQL")
        }
            res.json(rows)
    })//sort
    }else{
        if(sort==null){
            connection.query("SELECT * from usertab where username or hoten like ? ORDER BY "+ orderby +" ASC limit ?,?",[searchobj,parseInt(offset), parseInt(max)], (err, rows) =>{
            if (err){
                console.log('failedddd', err)
            }else{
                console.log("Success fetch MySQL")
            }
                res.json(rows)
            })  
        }else{
            connection.query("SELECT * from usertab where username or hoten like ? ORDER BY "+ orderby +" "+sort+" limit ?,?",[searchobj,parseInt(offset), parseInt(max)], (err, rows) =>{
            if (err){
                console.log('failedddd', err)
            }else{
                console.log("Success fetch MySQL")
            }
                res.json(rows)
            }) 
        }  
    }
    }
    }
})
//counting
app.get('/count', (req,res)=>{
    connection.query(" select count(*) as total from usertab", (err, rows)=>{
        console.log(rows[0].total)
    })
})

//add-user
app.post('/add-user', (req,res)=>{
    console.log('success')
    const createuser=req.body.username
    const createpass=req.body.password
    const createname=req.body.hoten
    const createemail=req.body.email

    connection.query("insert into usertab values (null,?,?,?,?)", [createuser, createpass, createname, createemail], (err, result)=>{
        if(err){
            console.log(err)
        }else{
            console.log('insert Success')
        }
        res.redirect('/admin/user')
    })
})
//delete-user
app.get('/delete-user', function(req, res){
    const delitem = req.query.id

    connection.query('Delete from usertab where id =? ', parseInt(delitem), (err,rows)=>{
        if(err){
            console.log(err)
        }else{
            console.log('Delete Success')
        }
        res.redirect('/users?offset=0&max=6')
    })
})
//updateuserfilling
app.get('/update-user/:id', function(req, res){
    const updateitem = req.params.id

    connection.query("Select * from usertab where id = ? ", parseInt(updateitem) ,(err, rows) =>{
        if (err){
            console.log('failedddd', err)
        }else{
            console.log("Filling Update Item Success")
        }
            res.json(rows)
    })
})

//updateuser
app.post('/updating-user/:id', function(req, res){
    const updateitem = req.params.id

    const updateuser=req.body.username
    const updatepass=req.body.password
    const updatename=req.body.hoten
    const updateemail=req.body.email

    connection.query("Update usertab Set username = ?, password = ?, hoten = ?, email = ? where id = ?",[updateuser, updatepass, updatename, updateemail, parseInt(updateitem)], (err, result) =>{
        if (err){
            console.log('failedddd', err)
        }else{
            console.log("Update Item Success")
        }
        res.redirect('/admin/user')
    })

})
//Product
app.get('/product', (req,res)=>{
    const offset = req.query.offset
    const max = req.query.max
    const orderby = req.query.orderby
    const sort = req.query.sort
    const searchobj ='%'+req.query.search+'%'

    if(req.query.search==null || req.query.search=='')
    {
    if(offset==null, max==null){
            connection.query("Select * from productinfo ORDER BY productid asc",(err, rows) =>{
        if (err){
            console.log('failedddd', err)
        }else{
            console.log("Success fetch MySQL")
        }
            res.json(rows)
    })
    }//pagination
    else{
    if(orderby==null){    
        connection.query("Select * from productinfo ORDER BY productid ASC limit ?,?",[parseInt(offset), parseInt(max)], (err, rows) =>{
        if (err){
            console.log('failedddd', err)
        }else{
            console.log("Success fetch MySQL")
        }
            res.json(rows)
    })//sort
    }else{
        if(sort==null){
            connection.query("Select * from productinfo ORDER BY "+ orderby +" ASC limit ?,?",[parseInt(offset), parseInt(max)], (err, rows) =>{
            if (err){
                console.log('failedddd', err)
            }else{
                console.log("Success fetch MySQL")
            }
                res.json(rows)
            })  
        }else{
            connection.query("Select * from productinfo ORDER BY "+ orderby +" "+sort+" limit ?,?",[parseInt(offset), parseInt(max)], (err, rows) =>{
            if (err){
                console.log('failedddd', err)
            }else{
                console.log("Success fetch MySQL")
            }
                res.json(rows)
            }) 
        }  
    }
    }
    }//search
    else{
        if(offset==null, max==null){
            connection.query("SELECT * from productinfo where productname like ? ORDER BY productid asc",searchobj,(err, rows) =>{
        if (err){
            console.log('failedddd', err)
        }else{
            console.log("Success fetch MySQL")
        }
            res.json(rows)
    })
    }//pagination
    else{
    if(orderby==null){    
        connection.query("SELECT * from productinfo where productname like ? ORDER BY productid ASC limit ?,?",[searchobj,parseInt(offset), parseInt(max)], (err, rows) =>{
        if (err){
            console.log('failedddd', err)
        }else{
            console.log("Success fetch MySQL")
        }
            res.json(rows)
    })//sort
    }else{
        if(sort==null){
            connection.query("SELECT * from productinfo where productname like ? ORDER BY "+ orderby +" ASC limit ?,?",[searchobj,parseInt(offset), parseInt(max)], (err, rows) =>{
            if (err){
                console.log('failedddd', err)
            }else{
                console.log("Success fetch MySQL")
            }
                res.json(rows)
            })  
        }else{
            connection.query("SELECT * from productinfo where productname like ? ORDER BY "+ orderby +" "+sort+" limit ?,?",[searchobj,parseInt(offset), parseInt(max)], (err, rows) =>{
            if (err){
                console.log('failedddd', err)
            }else{
                console.log("Success fetch MySQL")
            }
                res.json(rows)
            }) 
        }  
    }
    }
    }
})
//addproduct
app.post('/add-product', (req,res)=>{
    console.log('success')
    const addproducname=req.body.productname
    const addproductimage=req.body.image
    const addproductprice=req.body.price
    const addproductpromotionprice=req.body.price
    const addproductinfo=req.body.info
    const addproducttype=req.body.type

    connection.query("insert into productinfo values (null,?,?,?,?,?,?)", [addproducname, addproductimage, addproductprice, addproductpromotionprice,addproductinfo,addproducttype], (err, result)=>{
        if(err){
            console.log(err)
        }else{
            console.log('insert Success')
        }
        res.redirect('/admin/menu')
    })
})

app.get('/delete-product', function(req, res){
    const delitem = req.query.id

    connection.query('Delete from productinfo where productid = ? ', parseInt(delitem), (err,rows)=>{
        if(err){
            console.log(err)
        }else{
            console.log('Delete Success')
        }
        res.redirect('/product?offset=0&max=9')
    })
})
//updateproductfilling
app.get('/update-product/:id', function(req, res){
    const updateitem = req.params.id

    connection.query("Select * from productinfo where productid = ? ", parseInt(updateitem) ,(err, rows) =>{
        if (err){
            console.log('failedddd', err)
        }else{
            console.log("Filling Update Item Success")
        }
            res.json(rows)
    })
})

//updateproduct
app.post('/updating-product/:id', function(req, res){
    const updateitem = req.params.id

    const updateproducname=req.body.productname
    const updateproductimage=req.body.image
    const updateproductprice=req.body.price
    const updateproductpromotionprice=req.body.price
    const updateproductinfo=req.body.info
    const updateproducttype=req.body.type

    connection.query("Update productinfo Set productname = ?, image = ?, price = ?, promotionprice = ?, info = ?, type = ? where productid = ?",[updateproducname, updateproductimage, updateproductprice, updateproductpromotionprice,updateproductinfo,updateproducttype, parseInt(updateitem)], (err, result) =>{
        if (err){
            console.log('failedddd', err)
        }else{
            console.log("Update Item Success")
        }
        res.redirect('/admin/menu')
    })

})

//localhost:3009
app.listen(3009, ()=>{
    console.log('Server online')
})
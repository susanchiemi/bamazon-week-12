//require npm packages
var mysql = require("mysql");
var inquirer = require("inquirer");

//connect to mysql database
var connection = mysql.createConnection({
    host:"localhost",
    port:8889,
    user:"root",
    password:"root",
    database:"bamazon"
})

//initialize connection
connection.connect(function(err){
    if (err) throw err;
    console.log("connection successful!");
    makeTable();
})

var makeTable = function(){
    connection.query("SELECT * FROM products", function(err,res){
        for(var i=0; i<res.length; i++){
            console.log(res[i].itemid+" || "+res[i].productname+" || "+res[i].departmentname+" || "+res[i].price+" || "+res[i].stockquantity+"\n");
        }
        promptCustomer(res);
    })
}
    var promptCustomer = function(res){
        inquirer.prompt([{
            type:"input",
            name:"choice",
            message:"What would you like to purchase? [Quite with Q]"
        }]).then(function(answer){
            var correct = false;
            for(var i=0;i<res.length;i++){
                if(res[i].productname==answer.choice){
                    correct=true;
                    var product=answer.choice;
                    var id=i;
                    inquirer.prompt([{
                        type:"input",
                        name:"quant",
                        // How much would like to buy? 
                        // Throws an error isNan
                        message:"How much would you like to buy?",
                        validate: function(value){
                            if(isNan(value)==false){
                                return true;
                            } else {
                                return false;
                            }
                        }
                    }]).then(function(answer){
                        if((res[id].stockquanity-answer.quant)>0){
                            connection.query("UPDATE products SET stockquantity='"+(res[id].stockquantity-answer.quant)+"' WHERE productname='"+product+"'", function(err,res2){
                                console.log("Product Bought!");
                                makeTable();
                            })
                        } else {
                            console.log("Not a valid selection!");
                            promptCustomer(res);
                        }
                    })
                }
            }
        })
    }   
 /*           if(answer.choice.toUpperCase()=="Q"){
                process.exist();
            }

            for(var i=0;i<res.length;i++){
                if(res[i].productname==answer.choice){
                    correct=true;
                    var product=answer.choice;
                    var id=i;
                    
                    
                    })
                }
            }
            if(i==res.length && correct==false){
                console.log("Not a valid selection!");
                promptCustomer(res);
            }
        })

    }
    
    }
        }
    })
} */

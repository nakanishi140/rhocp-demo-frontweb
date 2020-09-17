/*	--------------------------------------------------------------------------/
*	author		: 
*	module		：
*											COPYRIGHT 
*	-------------------------------------------------------------------------*/


/*	--------------------------------------------------------------------------/
*	index.js
*	-------------------------------------------------------------------------*/	

const express = require('express');
const http = require("http");
const router = express.Router();

/*	--------------------------------------------------------------------------/
*	ルーティング：/top
*	-------------------------------------------------------------------------*/
router.get('/top', function (request, response) {

  let totalmeta = {};
  totalmeta.title = "UG-STYLE";
  totalmeta.cds = process.env.CDS_HOME;
  let totalrr = {};
  totalrr.title = {};
  totalrr.contents = {};

  /*	---------------------------------------------------------------------/
   *	main
   *	--------------------------------------------------------------------*/

  serial();

  /*	---------------------------------------------------------------------/
   *	promise : serial
   *	--------------------------------------------------------------------*/
  function serial () {
      let promise = Promise.resolve();
      promise
          .then(call_backweb1)
          .then((rr) => {
             return new Promise((resolve,reject) => {
               console.log(rr.body.title.body);
               console.log(rr.body.contents.body);
               totalrr.title.body = rr.body.title.body;
               totalrr.contents.body = rr.body.contents.body;
               resolve("connection complete");
             });
          })
          .then(render_page);
  }

  /*	---------------------------------------------------------------------/
   *	promise:function():call_title
   *	--------------------------------------------------------------------*/
  function call_backweb1() {
      return new Promise((resolve,reject) => {
          let options = {
              protocol: "http:",
              host: "backweb1",
              port: 8080,
              path: "/back1",
              method: "GET"
          };
          let rr = {};  
          _call_backweb(resolve,reject,options);
      });
  }

  /*	---------------------------------------------------------------------/
   *	promise:function():render_page
   *	--------------------------------------------------------------------*/
  function render_page () {
      return new Promise((resolve,reject) => {
          response.render('top',{ 
              meta:totalmeta,
              content1: totalrr.title.body,
              content2: totalrr.contents.body});
          resolve("render complete");
      });
  }


  /*	---------------------------------------------------------------------/
   *	common:function():http get
   *	--------------------------------------------------------------------*/
  function _call_backweb(resolve,reject,options,rr) {
      const req = http.request(options,(res)=>{
          let rr = {}
          let body = '';
          rr.status = res.statusCode;
          res.setEncoding("utf-8");
          res.on("data",(chunk) => {
              body += chunk;
          });
          res.on("end",(chunk)=>{
              try {
                rr.body = JSON.parse(body);
              } catch(error) {
                let obj ={};obj.json=[];
                rr.body = obj;
              }
              resolve(rr);
          });
      });
      req.on('error',(error) => {
        console.log(error.message);
        let obj ={};obj.json=[];
        rr.body = obj;
        resolve(rr);
      });
      req.end();
  }

});


module.exports = router;



const products = [];
var errors = [];
$(document).ready(function () {
  $("#notification .error").empty();
  $("#notification .success").hide();
  $("#notification .error").hide();
  $("#add_product_form .update").hide();
  $("#add_product").click(function () {
    var pid = $("#pId").val();
    var name = $("#pName").val();
    var price = $("#pPrice").val();
    var pq = $("#pQuant").val();
    if (validate(pid, name, price, pq)) {
      addItem(pid, name, price, pq);
      displayTable();
    }
  });
});
function validate(pid, name, price, quant) {
  if (pid == "") {
    $("#notification .error").show();
    $("#notification .error").append("<p>pid is  null</p>");
    return false;
  } else if (name == "") {
    $("#notification .error").show();
    $("#notification .error").append("<p>Name is  null</p>");
    return false;
  }
  if (price == "") {
    $("#notification .error").show();
    $("#notification .error").append("<p>Price is  null</p>");
    return false;
  }
  if (quant == "") {
    $("#notification .error").show();
    $("#notification .error").append("<p>Quantity is  null</p>");
    return false;
  }
  return true;
}
$("body").on("click", "#editBtn", function () {
  $("#add_product_form .update").show();
  $("#add_product_form .submit").hide();
  $("#notification .success").hide();
  var id = $(this).data("pid");
  for (let index = 0; index < products.length; index++) {
    if (products[index].productId == id) {
      $("#pId").val(products[index].productId);
      $("#pName").val(products[index].productName);
      $("#pPrice").val(products[index].productPrice);
      $("#pQuant").val(products[index].productQuantity);
      console.log(products[index]);
      break;
    }
  }
});
$("#update_product").on("click", function () {
  var pi = $("#pId").val();
  var pn = $("#pName").val();
  var pp = $("#pPrice").val();
  var pq = $("#pQuant").val();
  for (let index = 0; index < products.length; index++) {
    if (products[index].productId == pi) {
      products[index].productName = pn;
      products[index].productPrice = pp;
      products[index].productQuantity = pq;
    }
  }
  displayTable();
});

$("body").on("click", "#deleteBtn", function () {
  $("#add_product_form .update").hide();
  $("#add_product_form .submit").show();
  $("#notification .success").hide();
  var id = $(this).data("pid");
  console.log(id);
  var prod = [];
  for (let index = 0; index < products.length; index++) {
    if (products[index].productId == id) {
      prod = products[index];
    }
  }
  products.splice(products.indexOf(prod), 1);
  displayTable();
});
function addItem(pid, name, price, pq) {
  var arr = {
    productId: pid,
    productName: name,
    productPrice: price,
    productQuantity: pq,
  };
  products.push(arr);
  $("#notification .success").show();
}

function displayTable() {
  var nm =
    "<table><tr><th>SKU</th><th>Name</th><th>Price</th><th>Quantity</th><th>Action</th></tr>";
  for (let i = 0; i < products.length; i++) {
    nm =
      nm +
      "<tr><td>" +
      products[i].productId +
      "</td><td>" +
      products[i].productName +
      "</td><td>" +
      products[i].productPrice +
      "</td><td>" +
      products[i].productQuantity +
      "</td><td><a href='#' data-pid=" +
      products[i].productId +
      " id ='editBtn'>EDIT</a></td><td><a href='#' data-pid=" +
      products[i].productId +
      " id='deleteBtn'>DELETE</a></td></tr>";
  }
  nm += "</table>";
  $("#product_list").html(nm);
}

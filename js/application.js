var updateSubtotalPrice = function (ele) {

  var itemPrice = parseFloat($(ele).children('.price').text());
  var itemQuantity = parseFloat($(ele).find('.quantity input').val());

  var subtotalPrice = itemPrice * itemQuantity;
  $(ele).children('.subtotal').html(subtotalPrice);

  return subtotalPrice;
}


$(document).ready(function () {
  $('tbody tr').each(function (i, ele) {
    var subtotalPrice = updateSubtotalPrice (ele);
  });
});

var sum = function (acc, x) { return acc + x; };

var updateShoppingValue = function () {
  var itemValues = [];

  $('tbody tr').each(function (i, ele) {
    var totalValue = updateSubtotalPrice(ele);
    itemValues.push(totalValue);

    const newTotalValue = itemValues.filter(function (value) {
    return !Number.isNaN(value);
});

var totalShoppingValue = newTotalValue.reduce(sum);
$('#totalPrice').html(totalShoppingValue);

  });
}

$(document).ready(function () {
  updateShoppingValue();

  $('tr input').on('input', function () {
    updateShoppingValue();
  });

});

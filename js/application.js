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


$(document).on('click', '.cancel', function (event) {
  $(this).closest('tr').remove();
  updateShoppingValue();
});

var timeout;
$(document).on('input', 'tr input', function () {
  clearTimeout(timeout);
  timeout = setTimeout(function () {
    updateShoppingValue();
  }, 100);
});

  $('#addStock').on('submit', function (event) {
    event.preventDefault();
    var name = $(this).children('[name=name]').val();
    var price = $(this).children('[name=price]').val();
    var num = $(this).children('[name=num]').val();

    $('table').append('<tr>' +
  '<td class="name">' + name + '</td>' +
  '<td class="price">' + price + '</td>' +
  '<td class="quantity"><label>QTY </label><input type="text" class="qty" value="' + num + '"></input><button type="reset" value="cancel" class="cancel">Cancel</button></td>' +
  '<td class="subtotal"></td>' +
'</tr>');

updateShoppingValue();
 $(this).children('[name=name]').val('');
 $(this).children('[name=price]').val('');
 $(this).children('[name=num]').val('');
  });

});

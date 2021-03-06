var updateSubtotalPrice = function(ele) {

    var itemPrice = Number(parseFloat($(ele).children('.price').text().replace(/\$/, "")));
    var itemQuantity = parseFloat($(ele).find('.quantity input').val());

    var subtotalPrice = itemPrice * itemQuantity;

    if (!itemQuantity) {
        subtotalPrice = 0;
    }

    $(ele).children('.subtotal').html('$' + subtotalPrice);
    return subtotalPrice;
}


$(document).ready(function() {
    $('tbody tr').each(function(i, ele) {
        var subtotalPrice = updateSubtotalPrice(ele);
    });
});

var sum = function(acc, x) {
    return acc + x;
};

var updateShoppingValue = function() {
    var itemValues = [];

    $('tbody tr').each(function(i, ele) {
        var totalValue = updateSubtotalPrice(ele);
        itemValues.push(totalValue);

        const newTotalValue = itemValues.filter(function(value) {
            return !Number.isNaN(value);
        });

        var totalShoppingValue = newTotalValue.reduce(sum);
        $('#totalPrice').html(totalShoppingValue);
    });
}

$(document).ready(function() {
    updateShoppingValue();


    $(document).on('click', '.cancel', function(event) {
        $(this).closest('tr').remove();
        updateShoppingValue();
    });

    var timeout;
    $(document).on('input', 'tr input', function() {
        clearTimeout(timeout);
        timeout = setTimeout(function() {
            updateShoppingValue();
        }, 100);
    });

    $('#addStock').on('submit', function(event) {
        event.preventDefault();
        var name = $(this).find('[name=name]').val();  
        var price = $(this).find('[name=price]').val();
        var num = $(this).find('[name=num]').val();

        $('table').append('<tr>' +
            '<td class="name">' + name + '</td>' +
            '<td class="price">$' + price + '</td>' +
            (!num ? '<td class="quantity"><label>QTY </label><input type="number" class="qty" value="1"></input><button type="reset" value="cancel" class="cancel">Cancel</button></td>' : '<td class="quantity"><label>QTY </label><input type="number" class="qty" value="' + num + '"></input><button type="reset" value="cancel" class="cancel">Remove</button></td>') +
            '<td class="subtotal"></td>' +
            '</tr>');

        updateShoppingValue();
        $(this).find('[name=name]').val('');    
        $(this).find('[name=price]').val('');
        $(this).find('[name=num]').val('');
    });

});

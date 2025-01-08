$(document).ready(function () {
    const unitPrice = 2200; 
    const $quantitySelect = $('#quantity'); 
    const $pickupSelect = $('#pickup-method'); 
    const $productSubtotal = $('#product-subtotal'); 
    const $orderSubtotal = $('#order-subtotal'); 
    const $shippingCost = $('#shipping-cost'); 
    const $orderTotal = $('#order-total'); 

    // 設定運費對應的值
    const shippingFees = {
        "in-store": 0, 
        "delivery": 150 
    };

    // 更新價格
    function updatePrices() {
        const quantity = parseInt($quantitySelect.val()) || 0; 
        const shippingFee = shippingFees[$pickupSelect.val()] || 0; 
        const subtotal = unitPrice * quantity; 
        const total = subtotal + shippingFee; 

        // 更新顯示的數值
        $productSubtotal.text(subtotal); 
        $orderSubtotal.text(subtotal);
        $shippingCost.text(shippingFee); 
        $orderTotal.text(total); 
    }

    // 重新計算價格
    $quantitySelect.on('change', updatePrices);
    $pickupSelect.on('change', updatePrices);

    // 初始化計算
    updatePrices();
});

RegisterNetEvent("fv:user-notify")
AddEventHandler("fv:user-notify", function(user_id, value, amount, product_name)
    SendNUIMessage({
        action = "user-notify",
        user_id = user_id,
        product = value,
        amount = amount,
        product_name = product_name
    })
end)
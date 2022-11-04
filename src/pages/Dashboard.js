import { useState } from "react"

export default function Dashboard() {

  let [cartList, setCartList] = useState([])
  let [preTax, setPreTax] = useState(0)
  let tax = 0.10
  let itemList = [
    { itemName: "Kuku Bima", itemPrice: 5000 },
    { itemName: "Kopi pancong", itemPrice: 4000 },
    { itemName: "Teh Panas", itemPrice: 4000 },
    { itemName: "Lemon Madu", itemPrice: 12000 }

  ]

  const addItem = (itemName, itemPrice) => {
    let tempCart = cartList
    let tempPreTax = 0
    tempCart = [...cartList, { itemName, itemPrice }]
    setCartList(tempCart)
    for (let i = 0; tempCart.length > i; i++) {
      tempPreTax = tempPreTax + tempCart[i].itemPrice
      setPreTax(tempPreTax)
    }
  }

  const removeItem = (whichItem) => {
    let tempCart = []
    for (let i = 0; cartList.length > i; i++) {
      if (i !== whichItem) {
        tempCart.push(cartList[i])
      }
      setCartList(tempCart)
    }
    console.log('diklik', whichItem)
  }
  return (
    <div >
      <div className="flex justify-start p-2">
        <input className=" bg-gray-200 appearance-none border-2 border-gray-200 rounded  py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
          id="search"
          placeholder='Search'
          type="text"
          // value={search}
          onChange={(e) => {
            console.log(e)
            // setName(e.target.value)
          }} />

      </div>
      <div class="grid grid-cols-2 gap-4 place-content-stretch h-48">
        <div>
          <ul>
            {itemList.length > 0 ?
              <>
                <h1>Nama Minuman</h1>
                {itemList.map((item, i) => {
                  return (

                    <li>
                      <button
                        onClick={(e) => {
                          addItem(item.itemName, item.itemPrice)
                        }}
                        type="button"
                        key={i}
                        className="py-2 px-4 w-full rounded-t-lg capitalize border-b border-gray-200 dark:border-gray-600 hover:bg-slate-900"
                      >{item.itemName}

                      </button>
                    </li>
                  )
                })}
              </> : null}
          </ul>
        </div>
        <div>
          <ul>
            <h1>Keranjang</h1>
            {cartList.length > 0 ? cartList.map((cart, i) => {
              return (
                <li
                  className="flex justify-between py-2 px-4 w-full rounded-t-lg capitalize border-b border-gray-200 dark:border-gray-600 hover:bg-slate-900"
                  key={i}

                >
                  <div>
                    {cart.itemName}-{cart.itemPrice}
                  </div>
                  <div>
                    <i
                      onClick={() => {
                        removeItem(i)
                      }

                      }
                      className="cursor-pointer bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
                    >X</i>
                  </div>
                </li>

              )
            }) : null}
            {cartList.length > 0 ? (<>
              <div class="bg-blue-500 text-white font-bold rounded-t px-4 py-2">
                Total
              </div>
              <div class="border border-t-0 border-red-400 rounded-b bg-slate-400 px-4 py-1 text-black">
                <li>Jumlah Item : {cartList.length}</li>
                <li>PreTax=Rp{preTax}</li>
                <li>Total= {(preTax * tax) + preTax}</li>
              </div>

            </>) : null}


          </ul>
        </div>
      </div>
    </div>

  )
}
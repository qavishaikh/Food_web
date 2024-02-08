var image = document.getElementById("image")
var category = document.getElementById("category")
var model1 = document.getElementsByClassName("modal")
var btn = document.getElementById("btn")
var Data = document.getElementById("Data")
let cat_image = document.getElementById("cat_image")
let check = false
let currentEditKey = ""

var dbref = firebase.database().ref("category")
// console.log(model1[0].modal("hide"))

var imageUrl = ""

image.addEventListener("change", function (e) {
    console.log(e.target.files[0])
    imageUpload(e)
})


function viewCategory() {
    Data.innerHTML = ""

    dbref.get()
        .then((snapshoot) => {
            console.log(snapshoot.val())
            if (snapshoot.val() != undefined || snapshoot.val() != null) {
                var dataValue = Object.values(snapshoot.val())
                // console.log(dataValue)
                for (var i in dataValue) {
                    console.log(i)
                    Data.innerHTML += `
                <tr>
      <th class='th-1' scope="row">${(Number(i) + 1)}</th>
      <td class='th-1'>${dataValue[i]["categoryname"]}</td>
      <td class='th-1'>
      <img src="${dataValue[i]["categoryimage"]}"  />
      </td>
      
    </tr>
                `

                }

            }
        })

}


viewCategory()



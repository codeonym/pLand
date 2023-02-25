
export default function navBar() {

        /**
         * ** navBar settings
         */

            // select navBar & navBar btn
        let sideBar  =document.querySelector("#header .container .links")
        let sideBarBtn=document.querySelector("#header .container .sidebar-btn");

        // adding click event on navBar to open the sidebar
        sideBarBtn.addEventListener("click",(e)=>{
            // creating the closing btn of the sidebar
            let sideBarBtnClose=document.createElement("div");
            // appending the closing btn to the sidebar
            sideBarBtnClose.classList.add("sidebar-btn-close","fa","fa-close");
            sideBar.append(sideBarBtnClose);
            sideBar.style.display="flex";
        });

        // adding the click event of the close btn to close the sidebar
        sideBar.addEventListener("click", (e) =>{
            let sideBarBtnClose =document.querySelector("header#header .container .links .sidebar-btn-close");
            if(e.target === sideBarBtnClose){
                sideBar.style.display="none";
                sideBarBtnClose.remove();
            }
        })

        // resize event to show/hide the sidebar
        window.addEventListener("resize", function(){
            // if the current window width less than 767px hide the sidebar
            if(+this.innerWidth >767){
                sideBar.style.display="flex";
            }else {
                sideBar.style.display="none";
            }
        });
        /**
         * ** navBar settings ==> End
         */
}


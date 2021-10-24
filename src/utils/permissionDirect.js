export const hasPermission = {
    install (Vue) {
      Vue.directive('hasPermission', {
        bind (el, binding, vnode) {
          var flag=false;//默認不顯示
          let userInfo = vnode.context.$store.state.userInfo;


          var value=binding.value;

          if(userInfo.isAdmin){
            //如果是超級管理员
            flag=true;
          }else if(userInfo.perms.indexOf(value)!=-1){
            //如果有該權限按鈕顯示
            flag=true;
          }
          if (!flag) {
            // if (!el.parentNode) {
            //   el.style.display = 'none'
            // } else {
            //   el.parentNode.removeChild(el);
            // }
            el.setAttribute("disabled",true);
            el.classList.add("is-disabled");
          }
        }
      })
    }
  }

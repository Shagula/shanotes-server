"use strict";(self["webpackChunkshanotes_ui"]=self["webpackChunkshanotes_ui"]||[]).push([[803],{1803:function(e,t,l){l.r(t),l.d(t,{default:function(){return I}});var i=l(3396);const a={id:"main"};function o(e,t,l,o,d,n){const r=(0,i.up)("PathTree");return(0,i.wg)(),(0,i.iD)("div",a,[(0,i.Wm)(r)])}var d=l(7139);const n=e=>((0,i.dD)("data-v-55349fb4"),e=e(),(0,i.Cn)(),e),r={class:"main"},s={class:"operator-bar"},f=(0,i.Uk)("文件夹"),c=(0,i.Uk)("文件"),_={class:"dialog-footer"},u=(0,i.Uk)("取消"),h=(0,i.Uk)("确认"),p={style:{"margin-bottom":"40px","font-size":"30px",color:"red"}},m=n((()=>(0,i._)("br",null,null,-1))),w={class:"dialog-footer"},k=(0,i.Uk)("取消"),y=(0,i.Uk)("确认");function g(e,t,l,a,o,n){const g=(0,i.up)("ArrowLeft"),v=(0,i.up)("el-icon"),W=(0,i.up)("el-button"),C=(0,i.up)("FolderOpened"),b=(0,i.up)("FolderAdd"),V=(0,i.up)("Delete"),U=(0,i.up)("el-button-group"),x=(0,i.up)("el-tree"),D=(0,i.up)("el-card"),N=(0,i.up)("el-radio"),L=(0,i.up)("el-radio-group"),F=(0,i.up)("el-form-item"),M=(0,i.up)("el-input"),z=(0,i.up)("el-form"),A=(0,i.up)("el-dialog"),B=(0,i.Q2)("loading");return(0,i.wg)(),(0,i.iD)("div",r,[(0,i.Wm)(D,{id:"card"},{header:(0,i.w5)((()=>[(0,i._)("div",s,[(0,i.Wm)(W,{text:"",onClick:n.handleFolderBack},{default:(0,i.w5)((()=>[(0,i.Wm)(v,null,{default:(0,i.w5)((()=>[(0,i.Wm)(g)])),_:1})])),_:1},8,["onClick"]),(0,i.Wm)(U,null,{default:(0,i.w5)((()=>[(0,i.Wm)(W,{text:"",onClick:n.open_folder},{default:(0,i.w5)((()=>[(0,i.Wm)(v,null,{default:(0,i.w5)((()=>[(0,i.Wm)(C)])),_:1})])),_:1},8,["onClick"]),(0,i.Wm)(W,{text:"",onClick:t[0]||(t[0]=e=>o.dialog_vis=!0)},{default:(0,i.w5)((()=>[(0,i.Wm)(v,null,{default:(0,i.w5)((()=>[(0,i.Wm)(b)])),_:1})])),_:1}),(0,i.Wm)(W,{type:"danger",onClick:n.del_link},{default:(0,i.w5)((()=>[(0,i.Wm)(v,null,{default:(0,i.w5)((()=>[(0,i.Wm)(V)])),_:1})])),_:1},8,["onClick"])])),_:1})])])),default:(0,i.w5)((()=>[(0,i.wy)((0,i.Wm)(x,{"highlight-current":"",data:o.folder,onNodeClick:n.handleNodeClick,props:{class:n.customNodeClass}},null,8,["data","onNodeClick","props"]),[[B,o.loading]])])),_:1}),(0,i.Wm)(A,{modelValue:o.dialog_vis,"onUpdate:modelValue":t[4]||(t[4]=e=>o.dialog_vis=e),title:"创建新路径","before-close":n.handleDiaClose},{footer:(0,i.w5)((()=>[(0,i._)("span",_,[(0,i.Wm)(W,{onClick:t[3]||(t[3]=e=>o.dialog_vis=!1)},{default:(0,i.w5)((()=>[u])),_:1}),(0,i.Wm)(W,{type:"primary",onClick:n.createLink},{default:(0,i.w5)((()=>[h])),_:1},8,["onClick"])])])),default:(0,i.w5)((()=>[(0,i.Wm)(z,{"label-width":"120px"},{default:(0,i.w5)((()=>[(0,i.Wm)(F,{label:"目录类型"},{default:(0,i.w5)((()=>[(0,i.Wm)(L,{modelValue:o.create_info.type,"onUpdate:modelValue":t[1]||(t[1]=e=>o.create_info.type=e)},{default:(0,i.w5)((()=>[(0,i.Wm)(N,{label:"folder"},{default:(0,i.w5)((()=>[f])),_:1}),(0,i.Wm)(N,{label:"file"},{default:(0,i.w5)((()=>[c])),_:1})])),_:1},8,["modelValue"])])),_:1}),(0,i.Wm)(F,{label:"标题"},{default:(0,i.w5)((()=>[(0,i.Wm)(M,{modelValue:o.create_info.title,"onUpdate:modelValue":t[2]||(t[2]=e=>o.create_info.title=e),style:{width:"200px"},id:"path-name-input"},null,8,["modelValue"])])),_:1})])),_:1})])),_:1},8,["modelValue","before-close"]),(0,i.Wm)(A,{modelValue:o.del_dia_vis,"onUpdate:modelValue":t[6]||(t[6]=e=>o.del_dia_vis=e),title:"删除确认"},{default:(0,i.w5)((()=>[(0,i._)("span",null,[(0,i._)("p",p,[(0,i.Uk)(" 你确定要删除"+(0,d.zw)(o.selected_folder.title)+"吗？删除操作不可撤销",1),m])]),(0,i._)("span",w,[(0,i.Wm)(W,{onClick:t[5]||(t[5]=e=>o.dialog_vis=!1)},{default:(0,i.w5)((()=>[k])),_:1}),(0,i.Wm)(W,{type:"primary",onClick:n.confirmDeleteLink},{default:(0,i.w5)((()=>[y])),_:1},8,["onClick"])])])),_:1},8,["modelValue"])])}var v=l(5937);async function W(){return await(0,v.gc)("/notes/root")}async function C(e,t){return await(0,v.Mx)("/notes/create_folder",{parent:e,title:t})}async function b(e,t){return await(0,v.Mx)("/notes/create_note",{parent:e,title:t})}async function V(e){return await(0,v.Mx)("/notes/del_link",{path_id:e})}async function U(e){return await(0,v.gc)("/notes/read_link",{path_id:e})}async function x(e){let t=[],l=await(0,v.gc)("/notes/read_link",{path_id:e});if(200!=l.meta.status)return[];let i=l.content,a=JSON.parse(i.content),o=await(0,v.gc)("/notes/read_child",{path_id:e});if(200!=o.meta.status||!o.value)return[];let d=new Map;o=o.value;for(let n of o)d.set(n.id,n);for(let n of a)d.has(n)&&t.push(d.get(n));return t}var D=l(2807);const N=1;var L={async mounted(){this.froot=this.folder[0],this.selected_folder=this.froot,await this.reload_root()},data(){return{create_info:{title:"",type:""},selected_fid:0,selected_folder:null,loading:!1,dialog_vis:!1,del_dia_vis:!1,is_empty_folder:!1,froot:null,folder:[{label:"根目录",path_id:0,link_type:1,depth:0,children:[],parent:0}]}},methods:{customNodeClass(e,t){let l=t.data;return 1==l.link_type?"is-folder":null},async reload_root(e=0){let t;if(0==e)this.froot.parent=0,this.froot.path_id=0,this.froot.label="根目录",this.froot.depth=0,this.froot.children=[],this.loading=!0,t=await W(),this.loading=!1,this.is_empty_folder=200!=t.meta.status,this.is_empty_folder||(this.froot.children=await this.process_folder(t.value,1));else{let l=await U(e);if(200!=l.meta.status)return alert(l.meta.message);l=l.content,console.log(l),this.froot.path_id=l.id,this.froot.label=l.title,this.froot.parent=l.parent,this.froot.depth=0,this.froot.children=[],this.loading=!0,t=await x(e),this.loading=!1,this.is_empty_folder=null==t,this.is_empty_folder||(this.froot.children=await this.process_folder(t,this.froot.path_id,1))}},async process_folder(e,t,l=1){let i=[];for(let a of e){let e={label:a.title,path_id:a.id,link_type:a.link_type,children:null,parent:t};if(l<this.froot.depth+2&&a.link_type==N){let t=await x(a.id);null!=t&&(e.children=await this.process_folder(t,a.id,l+1))}void 0!=a.children&&null!=a.children&&(e.children=a.children),i.push(e)}return i},handleDiaClose(){this.dialog_vis=!1},async handleFolderBack(){0!=this.froot.path_id&&await this.reload_root(this.froot.parent)},async createLink(){if(this.create_info.title.length<1)return alert("标题必须长度必须大于1");if("folder"==this.create_info.type){let e=await C(this.selected_fid,this.create_info.title);if(200!=e.meta.status)return alert("创建失败");e=e.id;let t={label:this.create_info.title,path_id:e,link_type:1,children:[]};this.selected_folder.children.push(t)}else if("file"==this.create_info.type){let e=await b(this.selected_fid,this.create_info.title);if(200!=e.meta.status)return alert("创建失败");e=e.id;let t={label:this.create_info.title,path_id:e,link_type:2,children:[]};this.selected_folder.children.push(t)}this.dialog_vis=!1},del_link(){this.del_dia_vis=!0},async open_folder(){this.selected_folder.link_type!=N?(0,D.z8)({message:"请打开一个文件夹",type:"error"}):await this.reload_root(this.selected_fid)},async confirmDeleteLink(){await V(this.selected_fid),this.del_dia_vis=!1;let e=t=>{if(t.link_type==N&&t.children){t.children=t.children.filter((e=>e.path_id!=this.selected_fid));for(let l of t.children)e(l)}};e(this.froot)},handleNodeClick(e){this.selected_fid=e.path_id,this.selected_folder=e,e.link_type}}},F=l(89);const M=(0,F.Z)(L,[["render",g],["__scopeId","data-v-55349fb4"]]);var z=M,A={components:{PathTree:z}};const B=(0,F.Z)(A,[["render",o],["__scopeId","data-v-eba5af8a"]]);var I=B}}]);
//# sourceMappingURL=803.d9b203a5.js.map
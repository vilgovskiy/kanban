(this.webpackJsonpkanban=this.webpackJsonpkanban||[]).push([[0],{26:function(e,t,a){},27:function(e,t,a){},46:function(e,t,a){},47:function(e,t,a){},48:function(e,t,a){},49:function(e,t,a){},50:function(e,t,a){},51:function(e,t,a){},52:function(e,t,a){},53:function(e,t,a){},54:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a(1),s=a.n(r),c=a(19),o=a.n(c),i=(a(26),a(27),a(2)),d=a(3),l=a(20),u=a.n(l).a.create({baseURL:"https://vilgovskiy-kanban.herokuapp.com",headers:{"Content-Type":"application/json",Accept:"application/json"}}),b=a(6),j=function(e,t){switch(t.type){case"DRAG_UPDATE":return Object(i.a)(Object(i.a)({},e),{},{dragOverColumn:t.column});case"TASK_UPDATE":var a=Object.values(e.tasks).filter((function(e){return e.id===t.taskID}))[0];a.column=e.dragOverColumn;var n=Object(i.a)(Object(i.a)({},e.tasks),{},Object(b.a)({},a.id,a));return Object(i.a)(Object(i.a)({},e),{},{tasks:n});case"TASKS_FETCH_START":return Object(i.a)(Object(i.a)({},e),{},{loading:!0});case"TASKS_FETCH":return Object(i.a)(Object(i.a)({},e),{},{tasks:t.tasks,loading:!1});case"ADD_TASK":return Object(i.a)(Object(i.a)({},e),{},{tasks:Object(i.a)(Object(i.a)({},e.tasks),{},Object(b.a)({},t.newTask.id,t.newTask))});case"EDIT_TASK":var r=Object(i.a)({},e.tasks);return r[t.updatedTask.id]=t.updatedTask,Object(i.a)(Object(i.a)({},e),{},{tasks:r});case"DELETE_TASK":var s=Object(i.a)({},e.tasks);return delete s[t.task_id],Object(i.a)(Object(i.a)({},e),{},{tasks:s});default:return e}},O={loading:!1,dragOverColumn:-1,tasks:{0:{id:0,title:"task0",description:"Task 0",severity:0,column:1},1:{id:1,title:"task1",description:"Task 1",severity:0,column:0},2:{id:2,title:"task2",description:"Task 2",severity:0,column:1},3:{id:3,title:"task3",description:"Task 3",severity:0,column:3}}},m=s.a.createContext({tasksState:O,tasksDispatch:function(){return null}}),h=function(e){var t=e.children,a=Object(r.useReducer)(j,O),s=Object(d.a)(a,2),c=s[0],o=s[1];return Object(n.jsx)(m.Provider,{value:{tasksState:c,tasksDispatch:o},children:t})},v=(a(46),{title:"",description:"",severity:0}),p=function(e){var t=Object(r.useContext)(m).tasksDispatch,a=Object(r.useState)(v),s=Object(d.a)(a,2),c=s[0],o=s[1],l=Object(r.useState)(""),j=Object(d.a)(l,2),O=j[0],h=j[1];Object(r.useEffect)((function(){"CREATE"!==e.type&&e.task&&o({title:e.task.title,description:e.task.description,severity:e.task.severity})}),[e.type,e.task]);var p=function(e,t){var a="severity"===t?+e.target.value:e.target.value,n=Object(i.a)(Object(i.a)({},c),{},Object(b.a)({},t,a));n.title.length>0&&""!==O&&h(""),o(n)};return Object(n.jsxs)("div",{children:[Object(n.jsx)("div",{className:"Backdrop",onClick:e.formCloseHandler}),Object(n.jsx)("div",{className:"TaskFormWrapper",children:Object(n.jsxs)("div",{className:"TaskForm",children:["CREATE"===e.type?Object(n.jsx)("h3",{children:"Create new task"}):Object(n.jsx)("h3",{children:"Edit task"}),Object(n.jsx)("div",{className:"Errors",children:O}),Object(n.jsxs)("form",{onSubmit:function(e){return e.preventDefault()},children:[Object(n.jsx)("div",{className:"TaskFormElement",id:"TaskTitle",children:Object(n.jsx)("input",{type:"text",placeholder:"Title",value:c.title,onChange:function(e){return p(e,"title")}})}),Object(n.jsx)("div",{className:"TaskFormElement",children:Object(n.jsx)("textarea",{placeholder:"Description",value:c.description,onChange:function(e){return p(e,"description")}})}),Object(n.jsxs)("div",{className:"TaskFormElement",children:[Object(n.jsx)("label",{children:"Severity"}),Object(n.jsxs)("select",{value:c.severity,onChange:function(e){return p(e,"severity")},children:[Object(n.jsx)("option",{value:0,children:"Low"},0),Object(n.jsx)("option",{value:1,children:"Medium"},1),Object(n.jsx)("option",{value:2,children:"High"},2),Object(n.jsx)("option",{value:3,children:"Extreme"},3)]})]}),Object(n.jsx)("button",{className:"General-btn Confirm-btn",onClick:"CREATE"===e.type?function(a){if(a.preventDefault(),c.title.length<1)h("Title must not be empty");else{var n={query:'mutation{add_task(title:"'.concat(c.title,'",description:"').concat(encodeURIComponent(c.description),'",severity:').concat(c.severity,",column:0,board:").concat(e.board_id,"){id,title,description,severity,column}}")};u.post("/api",n).then((function(e){var a=e.data;if(null!==a.data.add_task){var n=Object(i.a)(Object(i.a)({},a.data.add_task),{},{description:decodeURIComponent(a.data.add_task.description)});t({type:"ADD_TASK",newTask:n})}})).catch((function(e){return console.log(e)})),e.formCloseHandler()}}:function(a){var n;if(a.preventDefault(),c.title.length<1)h("Title must not be empty");else{var r={query:"mutation{update_task(id:".concat(null===(n=e.task)||void 0===n?void 0:n.id,',title:"').concat(c.title,'",description:"').concat(encodeURIComponent(c.description),'",severity:').concat(c.severity,"){id,title,description,severity,column}}")};u.post("/api",r).then((function(a){var n,r=a.data;if(null!==r.data.update_task&&r.data.update_task.id===(null===(n=e.task)||void 0===n?void 0:n.id)){var s=Object(i.a)(Object(i.a)({},r.data.update_task),{},{description:decodeURIComponent(r.data.update_task.description)});t({type:"EDIT_TASK",updatedTask:s})}else r.errors&&console.log(r.errors[0].message)})).catch((function(e){return console.log(e)})),e.formCloseHandler()}},children:"Accept"}),Object(n.jsx)("button",{className:"General-btn Cancel-btn",onClick:e.formCloseHandler,children:"Cancel"})]})]})})]})},f=(a(47),a(4)),x={0:" SevLow",1:" SevMedium",2:" SevHigh",3:" SevExtreme"},g=function(e){var t=Object(r.useState)(!1),a=Object(d.a)(t,2),s=a[0],c=a[1],o=Object(r.useState)(!1),i=Object(d.a)(o,2),l=i[0],u=i[1],b=Object(n.jsx)("p",{children:e.task.description});e.task.description.length>60&&!s&&(b=Object(n.jsxs)("p",{className:"Expandable",children:[e.task.description.substring(0,60),Object(n.jsx)("span",{children:"..."})]}));var j=l?Object(n.jsx)(p,{type:"EDIT",task:e.task,formCloseHandler:function(){return u(!1)}}):null,O=x[e.task.severity];return Object(n.jsxs)("div",{className:"KanBanCard"+O,draggable:!0,onDragEnd:function(t){return e.onDragEnd(t,e.task.id)},children:[Object(n.jsxs)("div",{className:"CardTitle",children:[j,Object(n.jsx)("h4",{children:e.task.title}),Object(n.jsxs)("div",{className:"CardChangeIcons",children:[Object(n.jsx)("div",{className:"CardChangeIcon",onClick:function(){return u(!0)},children:Object(n.jsx)(f.d,{size:20})}),Object(n.jsx)("div",{className:"CardChangeIcon",onClick:function(){return e.onTaskDelete(e.task.id)},children:Object(n.jsx)(f.c,{size:20})})]})]}),e.task.description.length>0?Object(n.jsx)("div",{className:"CardDescription",onClick:function(){return c(!s)},children:b}):null]})},k=(a(48),function(e){return Object(n.jsxs)("div",{className:"KanBanColumn",onDragEnter:function(t){return e.onDragEnter(t,e.columnId)},children:[Object(n.jsx)("h3",{children:e.name}),Object(n.jsx)("div",{className:"TasksSection",children:e.tasks.map((function(t){return Object(n.jsx)(g,{task:t,onDragEnd:e.onDragEnd,onTaskDelete:e.onTaskDelete},t.id)}))})]})}),_=(a(49),a(9)),C=(a(50),function(e){var t=Object(r.useState)(""),a=Object(d.a)(t,2),c=a[0],o=a[1],i=Object(r.useState)([]),l=Object(d.a)(i,2),b=l[0],j=l[1],O=Object(r.useState)(null),m=Object(d.a)(O,2),h=m[0],v=m[1];Object(r.useEffect)((function(){u.get("/api?query={users_on_board(board_id: ".concat(e.board_id,"){id,name}}")).then((function(t){var a=t.data;null!=a.data.users_on_board?j(a.data.users_on_board.filter((function(t){return t.id!==e.user_id}))):a.errors&&v(a.errors[0].message)})).catch((function(e){console.log(e),v("Something went horribly wrong!")}))}),[e.board_id,e.user_id]);return Object(n.jsxs)(s.a.Fragment,{children:[Object(n.jsx)("div",{className:"Backdrop",onClick:e.closeHandler}),Object(n.jsxs)("div",{className:"AccessControl",children:[Object(n.jsx)("h3",{children:"Access Control"}),Object(n.jsx)("div",{className:"CloseIcon",onClick:e.closeHandler,children:Object(n.jsx)(f.b,{size:30})}),h?Object(n.jsx)("div",{className:"Errors",children:h}):null,Object(n.jsxs)("div",{className:"GeneralInput",children:[Object(n.jsx)("label",{children:"Add user"}),Object(n.jsx)("input",{type:"text",value:c,placeholder:"Username(case sensitive)",onChange:function(e){e.preventDefault(),e.target.value.length>0&&v(null),o(e.target.value)}}),Object(n.jsx)("button",{onClick:function(){if(c.length<1)v("Username can not be empty");else{var t={query:"mutation{add_user_to_board(board:".concat(e.board_id,',user:"').concat(c,'"){id,name}}')};u.post("/api",t).then((function(e){var t=e.data;null!=t.data.add_user_to_board?(j([].concat(Object(_.a)(b),[t.data.add_user_to_board])),v(null)):t.errors&&v(t.errors[0].message)})).catch((function(e){console.log(e),v("Something went horribly wrong")}))}},children:Object(n.jsx)(f.g,{size:30})})]}),Object(n.jsx)("h5",{children:"Users have access to this board:"}),Object(n.jsx)("div",{className:"CurrentUsers",children:b.map((function(t){return Object(n.jsxs)("div",{className:"CurrentUser",children:[t.name,Object(n.jsx)("button",{onClick:function(){return function(t){var a={query:"mutation{remove_user_from_board(user_id:".concat(t,",board_id:").concat(e.board_id,"){id}}")};u.post("/api",a).then((function(e){var a=e.data;null!==a.data.remove_user_from_board&&a.data.remove_user_from_board.id===t?j(b.filter((function(e){return e.id!==t}))):a.errors&&v(a.errors[0].message)})).catch((function(e){console.log(e),v("Something went horribly wrong!")}))}(t.id)},children:Object(n.jsx)(f.i,{size:25})})]},t.id)}))})]})]})}),y=[{id:0,name:"Backlog"},{id:1,name:"Assigned"},{id:2,name:"In Progress"},{id:3,name:"QA"},{id:4,name:"Completed"}],T=function(e){var t=e.userID,a=e.board,c=e.boardDelete,o=e.boardLeave,i=e.fetchTasks,l=Object(r.useContext)(m),b=l.tasksState,j=l.tasksDispatch,O=Object(r.useState)(!1),h=Object(d.a)(O,2),v=h[0],x=h[1],g=Object(r.useState)(!1),_=Object(d.a)(g,2),T=_[0],D=_[1],E=b.tasks,S=function(e,t){e.preventDefault(),j({type:"DRAG_UPDATE",column:t})},N=function(e,t){if(e.preventDefault(),b.tasks[t].column!==b.dragOverColumn){var a={query:"mutation {\n        move_task(task_id:".concat(t,", column:").concat(b.dragOverColumn,"){\n          id,\n          title,\n          description,\n          severity,\n          column\n        }\n      }")};u.post("/api",a).then((function(e){var a=e.data;null!==a.data.move_task&&a.data.move_task.id===t&&j({type:"TASK_UPDATE",taskID:t})})).catch((function(e){return console.log(e)}))}},A=function(e){var t={query:"mutation{delete_task(id:".concat(e,"){id}}")};u.post("/api",t).then((function(t){var a=t.data;null!=a.data.delete_task&&a.data.delete_task.id===e?j({type:"DELETE_TASK",task_id:e}):a.errors&&console.log(a.errors)})).catch((function(e){return console.log(e)}))},I=v?Object(n.jsx)(p,{type:"CREATE",board_id:a.id,formCloseHandler:function(){return x(!1)}}):null,w=T?Object(n.jsx)(C,{user_id:t,board_id:a.id,closeHandler:function(){return D(!1)}}):null,B=Object(n.jsxs)("div",{className:"BoardControls",children:[Object(n.jsx)("h1",{children:a.name}),Object(n.jsxs)("div",{className:"General-btn Confirm-btn AddTask",onClick:function(){return x(!0)},children:[Object(n.jsx)(f.a,{size:30}),"Add Task"]}),Object(n.jsxs)("div",{className:"General-btn Util-btn AddTask",onClick:i,children:[Object(n.jsx)(f.h,{size:30}),"Refresh"]}),a.isOwner?Object(n.jsxs)(s.a.Fragment,{children:[Object(n.jsx)("div",{className:"General-btn Cancel-btn DeleteIcon",onClick:function(){return c(a.id)},children:Object(n.jsx)(f.c,{size:30})}),Object(n.jsxs)("div",{className:"General-btn Warning-btn AccessControlButton",onClick:function(){return D(!0)},children:[Object(n.jsx)(f.f,{size:30})," Access control"]})]}):Object(n.jsxs)("div",{className:"General-btn Cancel-btn LeaveButton",onClick:function(){return o(a.id)},children:[Object(n.jsx)(f.e,{size:30}),"Leave"]}),I,w]});return Object(n.jsxs)("div",{className:"KanBanBoard",children:[B,Object(n.jsx)("div",{className:"Columns",children:y.map((function(e){return Object(n.jsx)(k,{name:e.name,columnId:e.id,tasks:Object.values(E).filter((function(t){return t.column===e.id})),onDragEnter:S,onDragEnd:N,onTaskDelete:A},e.id)}))})]})},D=s.a.memo(T,(function(e,t){return e.board.id===t.board.id})),E={loaded:!1,id:-1},S={loggedIn:!1,username:"",userID:null,boards:[],activeBoard:E},N=function(e,t){switch(t.type){case"LOG_IN":var a=t.user.boards.map((function(e){return{id:e.id,name:e.name,isOwner:e.owner.id===t.user.id}}));return Object(i.a)(Object(i.a)({},e),{},{loggedIn:!0,userID:t.user.id,username:t.user.name,boards:a});case"LOG_OUT":return S;case"ADD_BOARD":var n=[].concat(Object(_.a)(e.boards),[t.board]);return Object(i.a)(Object(i.a)({},e),{},{boards:n,activeBoard:{loaded:!0,id:n.length-1}});case"DELETE_BOARD":var r=e.boards.filter((function(e){return e.id!==t.board_id}));return Object(i.a)(Object(i.a)({},e),{},{boards:r,activeBoard:E});case"SET_ACTIVE_BOARD":return Object(i.a)(Object(i.a)({},e),{},{activeBoard:{loaded:!0,id:t.id}});case"LEAVE_BOARD":return Object(i.a)(Object(i.a)({},e),{},{boards:e.boards.filter((function(e){return e.id!==t.board_id})),activeBoard:E});default:return e}},A={loggedIn:!1,username:"",userID:null,boards:[],activeBoard:{loaded:!1,id:-1}},I=s.a.createContext({userState:A,userDispatch:function(){return null}}),w=function(e){var t=e.children,a=Object(r.useReducer)(N,A),s=Object(d.a)(a,2),c=s[0],o=s[1];return Object(n.jsx)(I.Provider,{value:{userState:c,userDispatch:o},children:t})},B=(a(51),function(e){var t=Object(r.useState)(e.boards.length>0?e.boards[0].id:-1),a=Object(d.a)(t,2),s=a[0],c=a[1];Object(r.useEffect)((function(){void 0===e.boards.find((function(e){return e.id===s}))&&c(e.boards.length>0?e.boards[0].id:-1)}),[e.boards,s]);var o=Object(r.useState)(""),i=Object(d.a)(o,2),l=i[0],u=i[1],b=0===l.length?{color:"#efefef"}:void 0,j=Object(n.jsxs)("div",{className:"GeneralInput",id:"BoardCreation",children:[Object(n.jsx)("label",{children:"Create a board"}),Object(n.jsx)("input",{type:"text",value:l,placeholder:"New board name",onChange:function(e){u(e.target.value)}}),Object(n.jsx)("button",{onClick:function(){l.length>0&&e.createHandler(l)},style:b,children:Object(n.jsx)(f.a,{size:30})})]}),O=e.boards.length>0?Object(n.jsxs)("div",{className:"BoardSelection",children:[Object(n.jsx)("label",{children:"Or select existing:"}),Object(n.jsx)("select",{id:"BoardSelection",onChange:function(e){c(+e.target.value)},children:e.boards.map((function(e){return Object(n.jsx)("option",{value:e.id,children:e.name},e.id)}))}),Object(n.jsx)("button",{id:"LoadBoardButton",onClick:function(){return e.loadHandler(s)},children:"Load"})]}):null;return Object(n.jsxs)("div",{className:"Toolbar",children:[Object(n.jsxs)("div",{className:"ToolbarControls",children:[j,O]}),Object(n.jsx)("div",{id:"WelcomeMessage",children:Object(n.jsxs)("span",{style:{verticalAlign:"middle"},children:["Hello ",e.user,"!"]})}),Object(n.jsx)("button",{className:"LogOutButton",onClick:e.logOutHandler,children:"Log out"})]})}),L=function(){var e=Object(r.useContext)(I),t=e.userState,a=e.userDispatch,s=Object(r.useContext)(m).tasksDispatch,c=function(){s({type:"TASKS_FETCH_START"}),u.get("/api?query={tasks_on_board(board_id:".concat(t.boards[t.activeBoard.id].id,"){id,title,description,severity,column}}")).then((function(e){var t=e.data;if(null!=t.data.tasks_on_board){for(var a={},n=0;n<t.data.tasks_on_board.length;n++){var r=Object(i.a)(Object(i.a)({},t.data.tasks_on_board[n]),{},{description:decodeURIComponent(t.data.tasks_on_board[n].description)});a[r.id]=r}s({type:"TASKS_FETCH",tasks:a})}}))};Object(r.useEffect)((function(){t.activeBoard.loaded&&c()}),[t.activeBoard.id,t.activeBoard.loaded,t.boards,s]);var o=t.activeBoard.loaded&&null!==t.boards?Object(n.jsx)(D,{userID:t.userID,board:t.boards[t.activeBoard.id],boardDelete:function(e){var t={query:"mutation{delete_board(id:".concat(e,"){id}}")};u.post("/api",t).then((function(t){t.data.errors||a({type:"DELETE_BOARD",board_id:e})})).catch((function(e){return console.log(e)}))},boardLeave:function(e){var n={query:"mutation{remove_user_from_board(board_id:".concat(e,", user_id:").concat(t.userID,"){id}}")};u.post("/api",n).then((function(n){console.log(n);var r=n.data;null!==r.data.remove_user_from_board&&r.data.remove_user_from_board.id===t.userID?a({type:"LEAVE_BOARD",board_id:e}):r.errors&&console.log(r.errors[0].message)})).catch((function(e){return console.log(e)}))},fetchTasks:c}):null;return Object(n.jsxs)("div",{children:[Object(n.jsx)(B,{user:t.username,boards:t.boards,createHandler:function(e){if(t.loggedIn){var n={query:'mutation{add_board(name:"'.concat(e,'",owner:').concat(t.userID,"){id,name}}")};u.post("/api",n).then((function(e){var t=e.data;null!==t.data.add_board&&a({type:"ADD_BOARD",board:Object(i.a)(Object(i.a)({},t.data.add_board),{},{isOwner:!0})})})).catch((function(e){return console.log(e)}))}},loadHandler:function(e){if(null!=e&&e>0){var n=null!==t.boards?t.boards.findIndex((function(t){return t.id===e})):-1;a({type:"SET_ACTIVE_BOARD",id:n})}},logOutHandler:function(){a({type:"LOG_OUT"})}}),o]})},U=(a(52),function(){return Object(n.jsx)("div",{className:"Spinner",children:"Loading..."})}),R=(a(53),{username:"",password:""}),G=function(){var e=Object(r.useContext)(I).userDispatch,t=Object(r.useState)(R),a=Object(d.a)(t,2),s=a[0],c=a[1],o=Object(r.useState)(null),l=Object(d.a)(o,2),j=l[0],O=l[1],m=Object(r.useState)(null),h=Object(d.a)(m,2),v=h[0],p=h[1],f=Object(r.useState)(!1),x=Object(d.a)(f,2),g=x[0],k=x[1],_=function(e,t){var a=Object(i.a)(Object(i.a)({},s),{},Object(b.a)({},t,e.target.value));c(a)},C=function(e){var t={};return s.username.length<1&&(t.username="Username can not be empty"),s.username.includes(" ")&&(t.username="Username can not contain spaces"),"SIGNUP"===e&&s.password.length<6?t.password="Password must be at least 6 characters long.":s.password.length<1&&(t.password="Password can not be empty."),!(Object.keys(t).length>0)||(O(t),!1)};return Object(n.jsxs)("div",{className:"LogInForm",children:[Object(n.jsx)("h2",{children:"Hello User! "}),Object(n.jsx)("h3",{children:"Please sign in to view boards!"}),Object(n.jsx)("div",{className:"Errors",children:null!==j?Object.keys(j).map((function(e){return Object(n.jsx)("p",{children:j[e]},e)})):null}),Object(n.jsx)("div",{className:"LogInMessages",children:null!==v?Object(n.jsx)("p",{children:v}):null}),g?Object(n.jsx)(U,{}):null,Object(n.jsxs)("form",{children:[Object(n.jsxs)("div",{className:"LogInFormGroup",children:[Object(n.jsx)("input",{className:j&&j.username?"NeedFixing":"",type:"text",id:"username",placeholder:"Username",value:s.username,onChange:function(e){return _(e,"username")},required:!0}),Object(n.jsx)("label",{htmlFor:"username",children:"Username"})]}),Object(n.jsxs)("div",{className:"LogInFormGroup",children:[Object(n.jsx)("input",{className:j&&j.password?"NeedFixing":"",type:"password",id:"password",placeholder:"Password",value:s.password,onChange:function(e){return _(e,"password")},required:!0}),Object(n.jsx)("label",{htmlFor:"password",children:"Password"})]}),Object(n.jsx)("button",{onClick:function(t){t.preventDefault(),C("LOGIN")&&(k(!0),u.get('/api?query={auth(name:"'.concat(s.username,'",password:"').concat(s.password,'"){id,name,boards{id,name,,owner{id}}}}')).then((function(t){var a=t.data;if(null!==a.data.auth)e({type:"LOG_IN",user:a.data.auth});else{p(null);var n="Could not log in, please check you username/password";a.errors&&(n=a.errors.join("; ")),O({LOGIN:n}),k(!1)}})).catch((function(e){console.log(e),O({LOGIN:"Opps something went terribly wrong!"}),k(!1)})))},children:"Log in"}),Object(n.jsx)("button",{onClick:function(e){if(e.preventDefault(),C("SIGNUP")){k(!0);var t={query:'mutation{add_user(name:"'.concat(s.username,'",password:"').concat(s.password,'"){id,name}}')};u.post("/api",t).then((function(e){var t=e.data;if(null!==t.data.add_user)O(null),p("Successfully created user ".concat(t.data.add_user.name,". Now you can log in with this username: "));else if(t.errors){var a="";t.errors[0].message.includes("duplicate key value")&&(a=": User with such name already exists"),O({SIGNUP:"Could not create user ".concat(s.username).concat(a)}),p(null)}k(!1)})).catch((function(e){console.log(e),k(!1)}))}},children:"Sign up"})]})]})},H=function(){var e=Object(r.useContext)(I).userState.loggedIn?Object(n.jsx)(L,{}):Object(n.jsx)(G,{});return Object(n.jsx)(h,{children:Object(n.jsx)("div",{className:"App",children:e})})},F=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,55)).then((function(t){var a=t.getCLS,n=t.getFID,r=t.getFCP,s=t.getLCP,c=t.getTTFB;a(e),n(e),r(e),s(e),c(e)}))};o.a.render(Object(n.jsx)(s.a.StrictMode,{children:Object(n.jsx)(w,{children:Object(n.jsx)(H,{})})}),document.getElementById("root")),F()}},[[54,1,2]]]);
//# sourceMappingURL=main.83bd5da7.chunk.js.map
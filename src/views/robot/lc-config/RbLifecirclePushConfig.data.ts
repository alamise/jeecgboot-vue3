import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
import {JVxeTypes,JVxeColumn} from '/@/components/jeecg/JVxeTable/types'
//列表数据
export const columns: BasicColumn[] = [
   {
    title: '圈子ID',
    align:"center",
    dataIndex: 'lcId'
   },
   {
    title: '圈子名称',
    align:"center",
    dataIndex: 'lcName'
   },
   {
    title: '尾缀',
    align:"center",
    dataIndex: 'tail'
   },
   {
    title: '推送',
    align:"center",
    dataIndex: 'needPush',
    customRender:({text}) => {
       return  render.renderSwitch(text, [{text:'是',value:'Y'},{text:'否',value:'N'}])
     },
   },
   {
    title: '统计',
    align:"center",
    dataIndex: 'needCount',
    customRender:({text}) => {
       return  render.renderSwitch(text, [{text:'是',value:'Y'},{text:'否',value:'N'}])
     },
   },
   {
    title: '类型',
    align:"center",
    dataIndex: 'type_dictText'
   },
   {
    title: '启用',
    align:"center",
    dataIndex: 'isActive',
    customRender:({text}) => {
       return  render.renderSwitch(text, [{text:'是',value:'Y'},{text:'否',value:'N'}])
     },
   },
   {
    title: '机器人编号',
    align:"center",
    dataIndex: 'robotCode_dictText'
   },
];
//查询数据
export const searchFormSchema: FormSchema[] = [
	{
      label: "圈子ID",
      field: "lcId",
      component: 'Input',
      colProps: {span: 6},
 	},
	{
      label: "圈子名称",
      field: "lcName",
      component: 'Input',
      colProps: {span: 6},
 	},
	{
      label: "尾缀",
      field: "tail",
      component: 'Input',
      colProps: {span: 6},
 	},
	{
      label: "推送",
      field: "needPush",
      component: 'JSwitch',
      componentProps:{
           query:true,
       },
      colProps: {span: 6},
 	},
	{
      label: "统计",
      field: "needCount",
      component: 'JSwitch',
      componentProps:{
           query:true,
       },
      colProps: {span: 6},
 	},
	{
      label: "类型",
      field: "type",
      component: 'JDictSelectTag',
      componentProps:{
          dictCode:"lifecircle_type"
      },
      colProps: {span: 6},
 	},
	{
      label: "启用",
      field: "isActive",
      component: 'JSwitch',
      componentProps:{
           query:true,
       },
      colProps: {span: 6},
 	},
];
//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '圈子ID',
    field: 'lcId',
    component: 'Input',
  },
  {
    label: '圈子名称',
    field: 'lcName',
    component: 'Input',
  },
  {
    label: '尾缀',
    field: 'tail',
    component: 'InputTextArea',
  },
  {
    label: '推送',
    field: 'needPush',
     component: 'JSwitch',
     componentProps:{
     },
  },
  {
    label: '统计',
    field: 'needCount',
     component: 'JSwitch',
     componentProps:{
     },
  },
  {
    label: '类型',
    field: 'type',
    component: 'JDictSelectTag',
    componentProps:{
        dictCode:"lifecircle_type"
     },
  },
  {
    label: '启用',
    field: 'isActive',
     component: 'JSwitch',
     componentProps:{
     },
  },
  {
    label: '机器人编号',
    field: 'robotCode',
    component: 'JDictSelectTag',
    componentProps:{
        dictCode:"rb_robot,name,code"
     },
  },
	// TODO 主键隐藏字段，目前写死为ID
	{
	  label: '',
	  field: 'id',
	  component: 'Input',
	  show: false
	},
];
//子表单数据
//子表表格配置
export const rbLifecirclePushConfigDetailColumns: JVxeColumn[] = [
    {
      title: '群名称',
      key: 'groupName',
      type: JVxeTypes.input,
      width:"200px",
      placeholder: '请输入${title}',
      defaultValue:'',
    },
    {
      title: '是否统计',
      key: 'needCount',
      type: JVxeTypes.checkbox,
      customValue: ['Y', 'N'],
      width:"200px",
      placeholder: '请输入${title}',
      defaultValue:'',
    },
  ]

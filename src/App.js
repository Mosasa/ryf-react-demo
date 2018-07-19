import React, { Component } from 'react';
//eslint-disable-next-line
import { Table, Pagination, Input,Row, Button, Modal, Form} from 'antd';//部分引入antd，解构
import 'antd/dist/antd.css';
import './App.css';
const { Search } = Input;
const FormItem = Form.Item;//FormItem来源Form解构于Item
const { confirm } = Modal;



// class UserGist extends Component {
//   state = {
//     username: '',
//     lastGistUrl:''
//   }
//   render () {
//     return (
//       <div>
//         { this.state.username }'s last gist is <a href={this.state.lastGistUrl}>here</a>
//       </div>
//     )
//   }
//   componentDidMounted () {
//     fetch(this.props.source)
//     .then(data => data.json())
//     .then(data => {
//       const lastGist = data[0];
//       this.setState({
//         username: lastGist.owner.login,
//         lastGistUrl: lastGist.html_url
//       })
//     })
//   }
// }
class App extends Component {
  state = {
    visible: false,
    users:[
      {
        username: '曾凯',
        age: 18,
        address: '杭州',
        id: 1
      },
      {
        username: '许杨',
        age: 18,
        address: '天津',
        id: 2
      }
  ]
  }
  remove (row) {
    const that = this;
    confirm({
      title: '是否要删除该用户？',
      okText: '是',
      cancelText: '否',
      onOk () {
        const _users = that.state.users.filter(data => {
          return data.id !== row.id
        });
        that.setState({
          users: _users
        })
      }
    })
  }
  columns = [
    {
      dataIndex: "username",
      title: "用户",
    },
    {
      dataIndex: "age",
      title: "年龄",
    },
    {
      dataIndex: "address",
      title: "地址",
    },
    {
      dataIndex: "action",
      title: "操作",
      width: 200,
      render: (Text, row) => {
        return (
          <div>
            <Button type="primary" onClick={() => {this.modal('edit', row)}}>编辑</Button>
            <Button type="danger" style={{marginLeft: 10}} onClick={() => this.remove(row)}>删除</Button>
          </div>
        )
      }
    }
  ]
  render() {
    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
      /* formItemLayout 样式属性的集合，对象解构 */
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    }
    return (
      <div className="App">
        {/* <UserGist source="https://api.github.com/users/octocat/gists" /> */}
        <Row>
          <Search style={{width: 300}} />
          <Button type="primary" style={{marginLeft: 20}} onClick={() => this.modal('add')}>添加用户</Button>
        </Row>
        <Row style={{paddingTop: 20}}>
         <Table dataSource={this.state.users} columns={this.columns} rowKey={row=>row.id} bordered pagination={false}></Table> {/* table会使用dataSource中的数据，进行循环输出 */}
        </Row>
        <Modal title="添加用户" visible={this.state.visible} 
        onCancel={() => this.setState({visible: false})}
        onOk={() => this.handleOk()}>
        {/* 箭头函数代替bind(this) */}
          <Form>
            <FormItem label="用户"{...formItemLayout}>
            {/* formItemLayout 样式属性的集合，对象解构 */}
              {
                getFieldDecorator('username', {
                  rules: [{ required: true, message:'Please input your username' }]
                })(<Input placeholder="UserName"></Input>)
              }
            </FormItem>
            <FormItem label="年龄" {...formItemLayout}>
              {getFieldDecorator(
                  'age', {
                    rules: [
                      {
                        required: true,
                        message: 'Please input your age!'
                      }
                    ]
                  }
                )(
                  <Input placeholder="age"></Input>
                )
              }
            </FormItem>
            <FormItem label="地址" {...formItemLayout}>
              {getFieldDecorator(
                  'address', {
                    rules: [
                      {
                        required: true,
                        message: 'Please input your address!'
                      }
                    ]
                  }
                )(
                  <Input placeholder="address"></Input>
                )
              }
            </FormItem>
          </Form>
        </Modal>
      </div>
    );
  }
  modal (type, row) {
    this.setState({
      visible: true
    },() => {
      this.props.form.resetFields();//每次打开都会reset一的新的表单
      if(type === 'add') return;
      this.props.form.setFieldsValue({
        username: row.username,
        age: row.age,
        address: row.address
      })
    }
    )
  }
  handleOk ()  {//异步函数，执行前需要先进行验证
    // console.log('ok');
    this.props.form.validateFieldsAndScroll((err, values) => {//异步回调函数
      // console.log(err)
      if(!err) {
        this.setState({
          visible: false
        })
      }
    })
  }
}

export default Form.create()(App);//App被Form组件包含，get到form表单上所有props
import React, { Component } from 'react'
import {Form,Card,Input,Button,Icon, message} from 'antd'

import LinkButton from '../../components/link-button'
import RichTextEdit from './rich-text-edit'
import { reqAddDiscount } from "../../api";
import {formateDate} from '../../utils/dateUtils'
import storageUtils from '../../utils/storageUtils'

const {Item} = Form;

class DiscountAdd extends Component {
  edit = React.createRef();

  submit = () => {
    this.props.form.validateFields(async (error, values) => {
      if (!error) {
        //蒐集數據
        const { username } = storageUtils.getUser();
        const { name, author } = values;
        const detail = this.edit.current.getDetail();
        const update = formateDate(Date.now());
        const discount = { username, name, author, detail, update };
        //如果是修改要加_id
        if (this.isUpdate) {
          discount._id = this.discount._id;
        }
        //調用街口去發表文章
        const result = await reqAddDiscount(discount);
        if (result.status === 0) {
          message.success(`${this.isUpdate ? "修改" : "發表"}文章成功`);
          this.props.history.goBack();
        } else {
          message.error(`${this.isUpdate ? "修改" : "發表"}文章失敗`);
        }
      }
    });
  };

  componentWillMount() {
    const discount = this.props.location.state; //如果是修改代表有值，否則沒值
    this.isUpdate = !!discount; //強制轉換成布林值，保存是否為點擊修改
    this.discount = discount || {};
  }

  render() {
    const { isUpdate, discount } = this;
    const { detail } = discount;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      wrapperCol: { span: 12 },
    };

    const title = (
      <span>
        <LinkButton
          onClick={() => {
            this.props.history.goBack();
          }}
        >
          <Icon type="arrow-left" />
        </LinkButton>
        <span>{isUpdate ? "修改商品" : "添加商品"}</span>
      </span>
    );

    return (
      <Card title={title}>
        <Form {...formItemLayout}>
          <Item>
            <div style={{ fontWeight: "bolder", fontSize: 15 }}>文章標題:</div>
            {getFieldDecorator("name", {
              initialValue: discount.name,
              rules: [{ required: true, message: "必須輸入文章標題" }],
            })(<Input placeholder="請輸入標題(上限25字)" maxLength={25} />)}
          </Item>
          <Item>
            <div style={{ fontWeight: "bolder", fontSize: 15 }}>作者:</div>
            {getFieldDecorator("author", {
              initialValue: discount.author,
              rules: [{ required: true, message: "必須輸入作者" }],
            })(<Input placeholder="請輸入作者(上限25字)" maxLength={25} />)}
          </Item>
          <Item wrapperCol={{ span: 20 }}>
            <div style={{ fontWeight: "bolder", fontSize: 15 }}>文章內容:</div>
            <RichTextEdit ref={this.edit} detail={detail} />
          </Item>
          <Item>
            <Button type="primary" onClick={this.submit}>
              發表
            </Button>
          </Item>
        </Form>
      </Card>
    );
  }
}


const Discount = Form.create()(DiscountAdd);
export default Discount;
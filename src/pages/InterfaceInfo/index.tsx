import {getInterfaceInfoByIdUsingGET, invokeInterfaceInfoUsingPOST,} from '@/services/yinggeapi-backend/interfaceInfoController';

import { useParams } from '@@/exports';
import { PageContainer } from '@ant-design/pro-components';
import { Button, Card, Descriptions, Divider, message } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import Form from 'antd/lib/form';
import React, { useEffect, useState } from 'react';

/**
 * 主页
 * @param param0
 * @returns
 */

const Index: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [invokeLoading, setInvokeLoading] = useState(false);
  const [data, setData] = useState<API.InterfaceInfo>();
  const params = useParams();
  const [invokeRes, setInvokeRes] = useState<any>();
  const loadData = async (current: number = 1, pageSize: number = 10) => {
    if (!params.id) {
      message.error('参数不存在');
    }
    setLoading(true);
    try {
      const res = await getInterfaceInfoByIdUsingGET({
        id: Number(params.id),
      });
      setData(res.data);
    } catch (error: any) {
      message.error('请求失败，' + error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const onFinish = async (values: any) => {
    if (!params.id) {
      message.error('参数不存在');
    }
    setInvokeLoading(true);
    try {
      const res = await invokeInterfaceInfoUsingPOST({
        id: params.id,
        ...values,
      });
      setInvokeRes(res.data);
      message.success('请求成功');
      setInvokeLoading(false);
      return true;
    } catch (error: any) {
      message.error('操作失败，' + error.message);
      return false;
    }
  };

  return (
    <PageContainer title="查看接口文档">
      <Card>
        {data ? (
          <Descriptions title={data.name} column={1} extra={<Button>调用</Button>}>
            <Descriptions.Item label="描述">{data.description}</Descriptions.Item>
            <Descriptions.Item label="请求地址">{data.url}</Descriptions.Item>
            <Descriptions.Item label="请求方法">{data.method}</Descriptions.Item>
            <Descriptions.Item label="请求参数">{data.requestParams}</Descriptions.Item>
            <Descriptions.Item label="状态">{data.status ? '正常' : '关闭'}</Descriptions.Item>
            <Descriptions.Item label="请求头">{data.requestHeader}</Descriptions.Item>
            <Descriptions.Item label="响应头">{data.responseHeader}</Descriptions.Item>
            <Descriptions.Item label="创建时间">{data.createTime}</Descriptions.Item>
            <Descriptions.Item label="更新时间">{data.updateTime}</Descriptions.Item>
          </Descriptions>
        ) : (
          <>接口不存在</>
        )}
      </Card>
      <Divider />
      <Card title="在线测试">
        <Form name="invoke" layout="vertical" onFinish={onFinish}>
          <Form.Item label="请求参数" name="userRequestParams">
            <TextArea />
          </Form.Item>

          <Form.Item wrapperCol={{ span: 16 }}>
            <Button type="primary" htmlType="submit">
              调用
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <Divider />
      <Card title="返回结果" loading={loading}>
        {invokeRes}
      </Card>
    </PageContainer>
  );
};

export default Index;

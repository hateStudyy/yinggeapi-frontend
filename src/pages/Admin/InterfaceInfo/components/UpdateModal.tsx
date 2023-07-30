import { ProColumns, ProTable } from '@ant-design/pro-components';
import { Modal } from 'antd';
import React, {useEffect, useRef} from 'react';

export type Props = {
  values: API.InterfaceInfo;
  columns: ProColumns<API.InterfaceInfo>[];
  onCancel: () => void;
  onSubmit: (values: API.InterfaceInfo) => Promise<void>;
  visible: boolean;
};
const UpdateModal: React.FC<Props> = (props) => {
  // FC 是 Function Component 的缩写
  const { values,visible, columns, onCancel, onSubmit } = props;
  const formRef = useRef<any>();

  useEffect(() => {
    if(formRef) {
      formRef.current?.setFieldsValue(values);
    }
  }, [values])
  return (
    <Modal open={visible} footer={null} onCancel={() => onCancel?.()}>
      <ProTable
        type={'form'}
        formRef={formRef}
        columns={columns}
        form={{
          initialValues:values
        }}
        onSubmit={async (values) => {
          onSubmit?.(values)
        }}
      />
    </Modal>
  );
};

export default UpdateModal;

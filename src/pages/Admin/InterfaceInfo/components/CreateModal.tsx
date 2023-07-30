import { ProColumns, ProTable } from '@ant-design/pro-components';
import { Modal } from 'antd';
import React from 'react';

export type Props = {
  columns: ProColumns<API.InterfaceInfo>[];
  onCancel: () => void;
  onSubmit: (values: API.InterfaceInfo) => Promise<void>;
  visible: boolean;
};
const CreateModal: React.FC<Props> = (props) => {
  // FC 是 Function Component 的缩写

  const { visible, columns, onCancel, onSubmit } = props;
  return (
    <Modal open={visible} footer={null} onCancel={() => onCancel?.()}>
      <ProTable
        type={'form'}
        columns={columns}
        onSubmit={async (values) => {
          onSubmit?.(values)
        }}
      />
    </Modal>
  );
};

export default CreateModal;

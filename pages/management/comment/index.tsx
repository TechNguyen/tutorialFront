import Head from 'next/head';
import SidebarLayout from '@/layouts/SidebarLayout';
import { Grid, Container } from '@mui/material';

import { ProColumns } from '@ant-design/pro-table';
import MyTable from '@/components/base/table';
import React, { useEffect, useState } from 'react';

import api from '@/api';


function CommentManager() {
  const [data, setData] = useState([]);


  useEffect(() => {
    fetchData();
    console.log(data);
    
  }, []);

  const columns: ProColumns<any>[] = [
    {
      title: 'Tác giả',
      width: 150,
      fixed: 'left',
      render: (_, row) => (
        <p>
          {row.user?.first_name} {row.user?.last_name}
        </p>
      )
    },
    {
      title: 'Nội dung bình luận',
      width: 100,
      fixed: 'left',
      render: (_, row) => <p>{row.content}</p>
    },
    {
      title: 'Gia sư',
      width: 200,
      fixed: 'left',
      render: (_, row) => <p>{row.author_id}</p>
    },

    {
        title: 'Thời gian tạo',
        width: 200,
        fixed: 'left',
        render: (_, row) => <p>{row.create_at}</p>
      },
   
   
  ];

  const fetchData = async () => {
    const res = await api.get('comment')
    setData(res.data.data);

    
  };



  return (
    <>
      <Head>
        <title>Quản lý bình luận</title>
      </Head>
      <Container
        maxWidth="lg"
        sx={{
          mt: 3
        }}
      >
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <MyTable
              title={'Danh sách bình luận'}
              rowKey="id"
              dataRows={data}
              columns={columns}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

CommentManager.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default CommentManager;

import Head from 'next/head';
import SidebarLayout from '@/layouts/SidebarLayout';
import { Grid, Container, Box, IconButton, Avatar } from '@mui/material';

import { ProColumns } from '@ant-design/pro-table';
import MyTable from '@/components/base/table';
import React, { useEffect, useState } from 'react';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ConfirmDeleteModal from '@/components/base/modal/ConfirmDeleteModal';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import api from '@/api';
import Image from 'next/image';
import ModalShowInfo from '@/components/management/tutor/ModalShowInfo';
import { FileCopyOutlined } from '@mui/icons-material';

function Rate() {
  const [data, setData] = useState([]);


  useEffect(() => {
    fetchData();
    console.log(data);
    
  }, []);

  const columns: ProColumns<any>[] = [
    
    {
      title: 'Người bình luận',
      width: 150,
      fixed: 'left',
      render: (_, row) => (
        <p>
          {row.user?.first_name} {row.author_id}
        </p>
      )
    },
    {
      title: 'Rate',
      width: 100,
      fixed: 'left',
      render: (_, row) => <p>{row.rate}</p>
    },
    
    {
      title: 'Gia sư',
      width: 200,
      fixed: 'left',
      render: (_, row) => <p>{row.view_id}</p>
    },
  ];

  const fetchData = async () => {
    const res = await api.get('rate')
    setData(res.data.data);
    
  };

 

  return (
    <>
      <Head>
        <title>Quản lý đánh giá</title>
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
              title={'Danh sách đánh giá'}
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

Rate.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default Rate;

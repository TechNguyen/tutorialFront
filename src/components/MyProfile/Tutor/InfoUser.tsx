import ControlTextField from '@/components/ControlTextField';
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup
} from '@mui/material';
import { FormDataHaha } from './ProfileTutor';
import { Controller, useForm } from 'react-hook-form';
import { enqueueSnackbar } from 'notistack';
import api from '@/api';
import { useRouter } from 'next/router';
import { memo, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import React from 'react';
import { Space, Table, Tag } from 'antd';


const defaultValues = {
  last_name: '',
  first_name: '',
  email: '',
  password: '',
  phone_number: '',
  gender: 'female',
};

const InfoUser = ({ data, id }) => {



  const columns = [
    {
      title: 'Name',
      dataIndex: 'course',
      key: 'course',
      render: (text) => (  <a href={`/course/${text.course_id}`} key={text.course_id}>{text.name}</a>),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    // {
    //   title: 'Tags',
    //   key: 'tags',
    //   dataIndex: 'tags',
    //   render: (_, { tags }) => (
    //     <>
    //       {tags.map((tag) => {
    //         let color = tag.length > 5 ? 'geekblue' : 'green';
    //         if (tag === 'loser') {
    //           color = 'volcano';
    //         }
    //         return (
    //           <Tag color={color} key={tag}>
    //             {tag.toUpperCase()}
    //           </Tag>
    //         );
    //       })}
    //     </>
    //   ),
    // },
    
  ];
  const [roleName, setRoleName] = useState(null)
  const { handleSubmit, control, setValue } = useForm<FormDataHaha>({
    defaultValues
  });


  const [dataRend, setdataRend] = useState([])
  const handleSaveInfo = async (data) => {
    try {
      const res = await api.put(`/user/update-user-info/${id}`, data);
      if (res.status === 200) {
        enqueueSnackbar({
          message: 'Cập nhật thông tin tài khoản thành công',
          variant: 'success'
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const fetchRow = async () => {
    const token = localStorage.getItem('access_token');
    if (token) {
      const decoded = jwtDecode<any>(token);
      if(decoded.role_id) {
        const rs = await api.get(`/role/${decoded.role_id}`)
        if(rs.status == 200) {
          setRoleName(rs.data.data.name)
        }
      }
    }
  }
  

  const fetchHistory = async () => {
    const token = localStorage.getItem('access_token');
    const decoded = jwtDecode<any>(token);
    const  rs = await api.get(`/booked-session/findBySTID/${decoded.user_id}`)
    setdataRend(rs.data.data);
    
  }

  console.log(dataRend);
  
 
  useEffect(() => {
    if (data) {
      setValue('first_name', data.first_name);
      setValue('last_name', data.last_name || '');
      setValue('email', data.email);
      setValue('phone_number', data.phone_number || '');
      setValue('gender', data.gender || 'female');
      fetchRow()
      fetchHistory()
    }
  }, [data]);

  return (
    <Box component="form" style={{overflow: 'scroll'}}>
      <h3>Thông tin tài khoản</h3>
      <Box>
        {
          roleName == 'Student' ? <ControlTextField
          control={control}
          name="first_name"
          label="Tên học sinh"
        /> : <ControlTextField
                  control={control}
                  name="first_name"
                  label="Tên gia sư"
        />}
        
       {
        roleName == 'Student' ?  <ControlTextField
        control={control}
        name="last_name"
        label="Họ học sinh"
      /> :  <ControlTextField
      control={control}
      name="last_name"
      label="Họ gia sư"
    />
       }


       
        <ControlTextField control={control} name="email" label="email" />
        <ControlTextField
          control={control}
          name="phone_number"
          label="Số điện thoại"
        />
        <Box sx={{ mt: 3 }}>
          <FormControl>
            <FormLabel>Giới tính</FormLabel>

            <Controller
              rules={{ required: true }}
              control={control}
              name="gender"
              defaultValue="female"
              render={({ field }) => (
                <RadioGroup {...field}>
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Nữ"
                  />
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Nam"
                  />
                </RadioGroup>
              )}
            />
          </FormControl>
        </Box>


             
        
       
        <Box
          sx={{
            mt: 3,
            display: 'flex',
            justifyContent: 'end'
          }}
        >
          <Button
            onClick={handleSubmit(handleSaveInfo)}
            color="primary"
            variant="contained"
          >
            Lưu
          </Button>
        </Box>
      </Box>



      <Box>
      {
          roleName == 'Student' && 
          <Table columns={columns} dataSource={dataRend} />
        }
      </Box>
    </Box>
  );
};

export default memo(InfoUser);

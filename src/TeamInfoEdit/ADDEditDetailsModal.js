

import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CancelIcon from '@mui/icons-material/Cancel';
import { useFormik } from 'formik';
import { Divider } from '@mui/material';
import { TextField } from '@mui/material';
import * as yup from 'yup';
import Radio from '@mui/material/Radio';
import { useDispatch } from 'react-redux';
import { addTeaminfo } from "../redux/TeaminfoSlice"
import { updateTeaminfo } from "../redux/TeaminfoSlice"
import { deleteTeaminfo } from "../redux/TeaminfoSlice"
import { useBaseModal } from '../Teaminfo/useBasemodal';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "37rem",

    bgcolor: 'background.paper',

    p: 4,
};



export default function ADDEditDetailsModal(props) {




    //  **************************** props destructuring******************
    const { open, handleClose, ids, type, iteminfo, dataList } = props

    const successmodal = useBaseModal()

    const [selectedValue, setSelectedValue] = React.useState('no');


    // ********************* Role radio handler ****************************************
    const RadiohandleChange = (event) => {
        setSelectedValue(event.target.value);
    };
    // ******************************************************Dispatch actions*************





    const dispatch = useDispatch();





    // *************************************** validationSchema For form Edit/Add ****************************************

    const validationSchema = yup.object({

        // **************************Check duplicate email/empty field *************************
        email: type !== "Add" ? yup.string()
            .email('Invalid email')
            .required('Please enter your email')
            :
            yup.string()
                .email('Invalid email')
                .required('Please enter your email')
                .test('unique-email', 'Email already exists', value => {
                    return !dataList.some(item => item.email === value);
                }),
        // **************************Check duplicate number/empty field *************************
        phone_no: type === "Add" ? yup.string().trim()
            .matches(/^[0-9]{10}$/, 'Invalid mobile number').required('Please enter phone number').test('is-duplicate', 'Phone No. already exists', value => {

                return !dataList.some(item => item.phone_no === value);
            }).test('is-duplicate', 'Phone No. already exists', value => {

                return !dataList.some(item => item.phone_no === value);
            })
            :
            yup.string().required('Please enter phone number'),
        first_name: yup.string().required('Please enter your name'),
        last_name: yup.string().required('Please enter your last name'),

    })


 

    // ******************************************************formik use for form  ************************************
    const formik = useFormik({
        initialValues: {
            first_name: "",
            last_name: "",

            email: "",

            phone_no: "",


        },
        validationSchema: validationSchema,

        onSubmit: (values) => {
            let val = values;
            val["id"] = ids === "edit" ? iteminfo?.id : ids;
            let admin = selectedValue === "yes" ? "yes" : "";
            let datarole = selectedValue === "no" ? "no" : "";
            val["admin_role"] = admin
            val["reqular_role"] = datarole






            if (type === "Edit") {


                dispatch(updateTeaminfo(val));
                handleClose()
                successmodal.open()

            }

            else {
                dispatch(addTeaminfo(val));
                handleClose()
                successmodal.open()
            }







        },

    });


    React.useEffect(() => {

        // ***************************************************** Pre fill form ****************************************************
        if (type !== "Add") {
            formik.setFieldValue("first_name", iteminfo.first_name)
            formik.setFieldValue("last_name", iteminfo.last_name)
            formik.setFieldValue("email", iteminfo.email)
            formik.setFieldValue("phone_no", iteminfo.phone_no)
            setSelectedValue(iteminfo?.reqular_role === "no" ? "no" : "yes")
        }

    }, [type,iteminfo])
    // **************************************** Delete Handler**********************************************8
    const DeleteHandler = (id) => {
        dispatch(deleteTeaminfo(id))
        handleClose()
        successmodal.open()
    }
    return (
        <div>
            <Modal

                open={open}
                onClose={handleClose}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
            >
                <Box sx={style}>
                 

                    <Box sx={{ display: 'flex', alignItems: 'center', height: '2.5rem' }}>
                        <Typography
                            style={{
                                fontSize: "1rem",
                                fontWeight: "600",
                                width: "100%",
                                textAlign: "center",
                                marginRight: '-2rem'
                            }}
                        >
                            {type === "Add" ? "Add" : "Edit"} a team member info.
                        </Typography>
                        <CancelIcon titleAccess="Close" sx={{ cursor: 'pointer', margin: '0.5rem' }} onClick={handleClose} />
                    </Box>
                    <Divider
                        sx={{
                            borderColor: "primary.light",
                            margin: "0 1rem",
                            marginBottom: "1rem",
                        }}
                    />


                    <Box sx={{ width: '100%', height: "30rem", }}
                    >

                        <form onSubmit={formik.handleSubmit}>
                            <Box
                                sx={{
                                    display: 'grid',
                                    gridTemplateColumns: '1fr',
                                    columnGap: '1rem',
                                }}>
                                <TextField
                                    size='small'
                                    type='text'
                                    id='first_name'
                                    name='first_name'
                                    label='First Name'
                                    variant='outlined'
                                    fullWidth
                                    sx={{
                                        marginBottom: '1rem',
                                        '& fieldset': {
                                            // Border color of the outlined input
                                            borderColor: 'primary.main',
                                        },
                                        '&:hover fieldset': {
                                            // Hover state border color
                                            borderColor: 'primary.dark',
                                        },
                                        '&.Mui-focused fieldset': {
                                            // Focused state border color
                                            borderColor: 'primary.main',
                                        },

                                        '& .MuiFormLabel-root.MuiInputLabel-root': {
                                            // Label color
                                            color: 'text.secondary',
                                            '&.Mui-focused': {
                                                // Focused label color
                                                color: 'text.primary',
                                            },
                                            '&.Mui-error': {
                                                // Error state label color
                                                color: 'error.main', // Adjust as needed
                                            },
                                        },
                                        '::placeholder': {
                                            color: 'rgba(255, 255, 255, 0.2)', // Set your desired placeholder color
                                        },
                                    }}

                                    value={formik.values.first_name}
                                    onChange={formik.handleChange}
                                    error={formik.touched.first_name && Boolean(formik.errors.first_name)}
                                    helperText={formik.touched.first_name && formik.errors.first_name}
                                />
                                <TextField
                                    size='small'
                                    type='text'
                                    id='last_name'
                                    name='last_name'
                                    label='Last Name'
                                    variant='outlined'
                                    fullWidth
                                    sx={{
                                        marginBottom: '1rem',
                                        '& fieldset': {
                                            // Border color of the outlined input
                                            borderColor: 'primary.main',
                                        },
                                        '&:hover fieldset': {
                                            // Hover state border color
                                            borderColor: 'primary.dark',
                                        },
                                        '&.Mui-focused fieldset': {
                                            // Focused state border color
                                            borderColor: 'primary.main',
                                        },


                                        '& .MuiFormLabel-root.MuiInputLabel-root': {
                                            // Label color
                                            color: 'text.secondary',
                                            '&.Mui-focused': {
                                                // Focused label color
                                                color: 'text.primary',
                                            },
                                            '&.Mui-error': {
                                                // Error state label color
                                                color: 'error.main', // Adjust as needed
                                            },
                                        },
                                        '::placeholder': {
                                            color: 'rgba(255, 255, 255, 0.2)', // Set your desired placeholder color
                                        },
                                    }}
                                    value={formik.values.last_name}
                                    onChange={formik.handleChange}
                                    error={formik.touched.last_name && Boolean(formik.errors.last_name)}
                                    helperText={formik.touched.last_name && formik.errors.last_name}
                                />
                                <TextField
                                    size='small'
                                    type='text'
                                    name='email'
                                    id='email'
                                    label='Email'
                                    variant='outlined'
                                    fullWidth
                                    sx={{
                                        marginBottom: '1rem',
                                        '& fieldset': {
                                            // Border color of the outlined input
                                            borderColor: 'primary.main',
                                        },
                                        '&:hover fieldset': {
                                            // Hover state border color
                                            borderColor: 'primary.dark',
                                        },
                                        '&.Mui-focused fieldset': {
                                            // Focused state border color
                                            borderColor: 'primary.main',
                                        },

                                        '& .MuiFormLabel-root.MuiInputLabel-root': {
                                            // Label color
                                            color: 'text.secondary',
                                            '&.Mui-focused': {
                                                // Focused label color
                                                color: 'text.primary',
                                            },
                                            '&.Mui-error': {
                                                // Error state label color
                                                color: 'error.main', // Adjust as needed
                                            },
                                        },
                                    }}
                                    value={formik.values.email}
                                    // onChange={  formik.handleChange}

                                    onChange={(e) => {


                                        return formik.setFieldValue("email", e.target.value);
                                    }}
                                    error={formik.touched.email && Boolean(formik.errors.email)}
                                    helperText={formik.touched.email && formik.errors.email}
                                />
                                <TextField
                                    size='small'
                                    type='number'
                                    label='Phone'
                                    name='phone_no'
                                    id='phone_no'
                                    variant='outlined'
                                    sx={{
                                        marginBottom: '1rem',
                                        '& fieldset': {
                                            // Border color of the outlined input
                                            borderColor: 'primary.main',
                                        },
                                        '&:hover fieldset': {
                                            // Hover state border color
                                            borderColor: 'primary.dark',
                                        },
                                        '&.Mui-focused fieldset': {
                                            // Focused state border color
                                            borderColor: 'primary.main',
                                        },


                                        '& .MuiFormLabel-root.MuiInputLabel-root': {
                                            // Label color
                                            color: 'text.secondary',
                                            '&.Mui-focused': {
                                                // Focused label color
                                                color: 'text.primary',
                                            },
                                            '&.Mui-error': {
                                                // Error state label color
                                                color: 'error.main', // Adjust as needed
                                            },
                                        },
                                    }}
                                    value={formik.values.phone_no}
                                    fullWidth
                                    onChange={formik.handleChange}
                                    error={formik.touched.phone_no && Boolean(formik.errors.phone_no)}
                                    helperText={formik.touched.phone_no && formik.errors.phone_no}
                                />




                                <Typography variant='subtitle1' gutterBottom>
                                    Role
                                </Typography>

                                <Box
                                    sx={{
                                        display: 'grid',
                                        gridTemplateColumns: '1fr ',
                                        columnGap: '1rem',
                                    }}>

                                    <Box sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "1rem"
                                    }}>
                                        <Typography variant='subtitle1' gutterBottom>
                                            Regular - Can't delete member :
                                        </Typography>
                                        <Radio
                                            checked={selectedValue === 'no'}
                                            onChange={RadiohandleChange}
                                            value="no"
                                            name="radio-buttons"
                                            inputProps={{ 'aria-label': 'No' }}
                                        />
                                    </Box>
                                    <Box sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "2rem"
                                    }}>

                                        <Typography variant='subtitle1' gutterBottom>

                                            Admin - Can  delete member :
                                        </Typography>
                                        <Radio
                                            checked={selectedValue === 'yes'}
                                            onChange={RadiohandleChange}
                                            value="yes"
                                            name="radio-buttons"
                                            inputProps={{ 'aria-label': 'Yes' }}
                                        />
                                    </Box>


                                </Box>


                                <Box>
                                    <Box sx={{ display: "flex", justifyContent: iteminfo?.admin_role === "yes" ? "space-between" : "flex-end" }} >
                                        {type === "Edit" ?
                                            <>
                                                {iteminfo?.admin_role === "yes" &&
                                                    <Button size="small" variant="contained" onClick={() => DeleteHandler(iteminfo?.id)}>
                                                        Delete
                                                    </Button>
                                                }

                                                <Button type="submit" size="small" variant="contained">
                                                    Edit
                                                </Button>
                                            </> :


                                            <Button type="submit" size="small" variant="contained">
                                                Save
                                            </Button>
                                        }
                                    </Box>
                                </Box>
                            </Box>







                        </form>


                    </Box>
                </Box>
            </Modal>
        </div>
    )
}

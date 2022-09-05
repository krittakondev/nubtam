import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArchiveIcon from '@mui/icons-material/Archive';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button'
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, ButtonGroup } from "@mui/material"

export default function FixedBottomNavigation() {
  const [profiles, setProfiles] = React.useState([
    //   {
    //   name: "แม่",
    //   count: 2
    // }
  ])
  const [dialog_open, setDialog_open] = React.useState(false)
  const [dialog_profile, setDialog_profile] = React.useState({
    open: false
  })
  const [value, setValue] = React.useState(0);
  const ref = React.useRef(null);
  React.useEffect(()=>{
    // setProfiles(window.localStorage.getItem("profiles") || [])

  }, [])

  const changeCount = (new_value) =>{
    setDialog_profile({
      ...dialog_profile,
      count: dialog_profile.count+new_value
    })
  }

  return (
    <Box sx={{ pb: 7 }} ref={ref}>
      <CssBaseline />
      <List>
        {profiles.map(({ name, count }, index) => (
          <ListItem button key={index + name} onClick={()=>{
            setDialog_profile({
              open: true,
              name,
              index,
              count,
              old_count: count
            })
          }}>
            <ListItemAvatar>
              <Avatar alt="Profile Picture">{name[0]}</Avatar>
            </ListItemAvatar>
            <ListItemText primary={name} />
            <h2>{count}</h2>
          </ListItem>
        ))}
      </List>
      <center>
        <Button onClick={()=>{
          setDialog_open(true)
        }}>เพิ่มผู้เล่น</Button>
        <Button color="secondary" onClick={()=>{
          if(window.confirm("ต้องการเริ่มเกมใหม่ใช่หรือไม่?")){
            setProfiles(profiles.map((val)=>{
              val.count = 0
              return val
            }))
            
          }
        }}>เริ่มใหม่</Button>
      </center>
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction label="นับแต้ม" icon={<RestoreIcon />} />
          <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
          <BottomNavigationAction label="Archive" icon={<ArchiveIcon />} />
        </BottomNavigation>
      </Paper>
      <Dialog open={dialog_profile.open}>
        <DialogTitle>แก้ไข {dialog_profile.name}</DialogTitle>
        <DialogContent>
        <TextField
          placeholder='ชื่อผู้เล่น'
          id="edit_name"
          defaultValue={dialog_profile.name}
          inputProps={{
            autoComplete: 'name',
          }}
        />
        <Button color="secondary" variant='contained' onClick={()=>{
          const my_confirm = window.confirm(`ต้องการลบ ${dialog_profile.name} จริงไหม?`)
          if(my_confirm){
            const new_arr = profiles.splice(0)
            new_arr.splice(dialog_profile.index, 1)
            setProfiles(new_arr)
          }
          
        }}>ลบออก</Button>
        <br />
        <span>คะแนนตอนนี: <b style={{fontSize: 30}}>{dialog_profile.count}</b></span>
        <Button variant='contained' color="inherit" onClick={()=>{
          setDialog_profile({...dialog_profile, count: dialog_profile.old_count})
        }}>ล้าง</Button>
        <br />
        <br />
        <center>
        <ButtonGroup variant="outlined" aria-label="outlined primary button group">
          <Button style={{color: "gray"}} onClick={()=>{
            changeCount(-7)
          }}>-7</Button>
          <Button style={{color: "red"}} onClick={()=>{
            changeCount(1)
          }}>แดง</Button>
          <Button style={{color: "orange"}} onClick={()=>{
            changeCount(2)
          }}>เหลือง</Button>
          <Button style={{color: "green"}} onClick={()=>{
            changeCount(3)
          }}>เขียว</Button>
        </ButtonGroup>

        <ButtonGroup variant="outlined" aria-label="outlined primary button group">
          <Button style={{color: "brown"}} onClick={()=>{
            changeCount(4)
          }}>ช๊อก</Button>
          <Button style={{color: "blue"}} onClick={()=>{
            changeCount(5)
          }}>น้ำเงิน</Button>
          <Button style={{color: "pink"}} onClick={()=>{
            changeCount(6)
          }}>ชมพู</Button>
          <Button style={{color: "black"}} onClick={()=>{
            changeCount(7)
          }}>ดำ</Button>
        </ButtonGroup>

        </center>
        </DialogContent>

        <DialogActions>
          <Button color='primary' onClick={()=>{
            const old_profiles = profiles.splice(0)
            const nameEle = document.getElementById("edit_name")
            if(nameEle.value == ""){
              return window.alert("input error")
            }
            old_profiles.splice(dialog_profile.index, 1, {
              name: nameEle.value,
              count: dialog_profile.count
            })
            setProfiles(old_profiles)
          }}>
            บันทึก
          </Button>
          <Button color="secondary" onClick={()=>{
              setDialog_profile({open: false})
          }}>
            ปิด
          </Button>
        </DialogActions>

      </Dialog>
      <Dialog open={dialog_open}>
        <DialogTitle>เพิ่มผู้เล่น</DialogTitle>
        <DialogContent>
        <TextField
          placeholder='ชื่อผู้เล่น'
          id="add_name"
          inputProps={{
            autoComplete: 'name',
          }}
        />
        </DialogContent>

        <DialogActions>
          <Button color='primary' onClick={()=>{
            const old_profiles = profiles.splice(0)
            const nameEle = document.getElementById("add_name")
            if(!nameEle.value){
              return window.alert("input error")
            }
            old_profiles.push({
              name: nameEle.value,
              count: 0
            })
            
            setProfiles(old_profiles)
            nameEle.value = ""
            
            
          }}>
            เพิ่ม
          </Button>
          <Button color="secondary" onClick={()=>{
              setDialog_open(false)
          }}>
            ยกเลิก
          </Button>
        </DialogActions>

      </Dialog>
    </Box>
  );
}

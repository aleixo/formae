
import { Box } from "@mui/system";
import Select from '@mui/material/Select';
import { FormControl, IconButton, InputLabel, MenuItem } from '@mui/material'
import {Preview, Save, List, AccountTree, Settings} from '@mui/icons-material'

import { Container } from "./toolbar.styles"

interface IProps {
    onSaveClick(): void,
    onPreviewClick(): void,
    onSettingsClick(): void,
    onListClick(): void,
    onHierarchyClick(): void,
    pages: any
}

const Toolbar = ({onSaveClick, onPreviewClick, onSettingsClick, onListClick, onHierarchyClick, pages}: IProps) => {
    
    return (
        <Container>
            <Box sx={{ minWidth: 200 }}>
                <FormControl fullWidth>
                    <InputLabel id="page-label">Page</InputLabel>
                    <Select    
                        labelId="page-label"
                        label="Page" value={'router.query.id'} fullWidth onChange={() => {
                        //router.push(`/builder?id=${event.target.value}`)
                    }}  >  
                        {Array.isArray(pages) && pages.map((page, i) => (
                            <MenuItem key={i} value={page.record}>{page.snippetMeta.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
             </Box>
            <IconButton onClick={onPreviewClick}><Preview/></IconButton>
            <IconButton onClick={onHierarchyClick}><AccountTree /></IconButton>
            <IconButton onClick={onListClick}><List /></IconButton>
            <IconButton onClick={onSettingsClick}><Settings /></IconButton>
            <IconButton onClick={onSaveClick}><Save/></IconButton>
        </Container>
    )
}

export {Toolbar}
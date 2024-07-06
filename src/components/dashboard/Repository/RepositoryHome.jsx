import React, { useState, useContext, useEffect } from 'react';
import Repository from './Repository';
import InsideARepo from './InsideARepo';
import { AppContext } from '../../AppContext';

const RepositoryHome = (props) => {
    const { sharedState, setSharedState } = useContext(AppContext);
    const [isFileOpen, setFileOpen] = useState(true);
    const [lookInsideId, setLookInsideId] = useState(0);
    const [lookInFolderVolumeIdx, setLookInFolderVolumeIdx] = useState(0);
    const [breadcrumbs, setBreadcrumbs] = useState([{ name: "Cabinet", index: 0 }]);
    const [reload, setReload] = useState(true);
    const [userRights, setUserRights] = useState(null);

    useEffect(()=>{
        setUserRights(sharedState)
    },[sharedState])

    useEffect(()=>{
        if(lookInsideId===0){
            setUserRights(sharedState);
        }
    },[lookInsideId])

    return (
        <div>
            {isFileOpen ? (
                <Repository 
                    isFileOpen={isFileOpen}
                    setFileOpen={setFileOpen}
                    lookInsideId={lookInsideId}
                    setLookInsideId={setLookInsideId}
                    breadcrumbs={breadcrumbs}
                    setBreadcrumbs={setBreadcrumbs}
                    reload={reload}
                    setReload={setReload}
                    deletedFolders={props.deletedFolders}
                    setDeletedFolders={props.setDeletedFolders}
                    open={props.open}
                    lookInFolderVolumeIdx={lookInFolderVolumeIdx}
                    setLookInFolderVolumeIdx={setLookInFolderVolumeIdx}
                    userRights={userRights}
                    setUserRights={setUserRights}
                />
            ) : (
                <InsideARepo
                    isFileOpen={isFileOpen}
                    setFileOpen={setFileOpen}
                    lookInsideId={lookInsideId}
                    setLookInsideId={setLookInsideId}
                    breadcrumbs={breadcrumbs}
                    setBreadcrumbs={setBreadcrumbs}
                    reload={reload}
                    setReload={setReload}
                    deletedFolders={props.deletedFolders}
                    setDeletedFolders={props.setDeletedFolders}
                    lookInFolderVolumeIdx={lookInFolderVolumeIdx}
                    setLookInFolderVolumeIdx={setLookInFolderVolumeIdx}
                    userRights={userRights}
                    setUserRights={setUserRights}
                />
            )}
        </div>
    );
};

export default RepositoryHome;

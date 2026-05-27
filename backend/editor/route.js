import { Router } from "express";
export const editorRouter = Router();
import {
    FetchUsers, CreateGroup, FetchGroups, AddToGroup, FetchGroupMembers,
    DeleteFromGroup, DeleteGroup, LeaveGroup, GetFriends, SendFriendRequest,
    GetUsers, GetFriendRequests, GetSentRequests, CancelRequest, RejectRequest,
    Unfriend,
    FetchNonMemberFriends
} from "./controller2.js"

import { requireAuth } from "../auth/middlewire.js";
import { GetFriend, GetGroup } from "./controller.js";


editorRouter.get("/fetch-users", requireAuth, FetchUsers);

editorRouter.post("/create-group", requireAuth, CreateGroup);
editorRouter.get("/fetchgroups", requireAuth, FetchGroups);
editorRouter.post("/addtogroup", requireAuth, AddToGroup);
editorRouter.get("/fetch-group-members/:group_id", requireAuth, FetchGroupMembers);
editorRouter.get("/fetch-non-members/:group_id", requireAuth, FetchNonMemberFriends)
editorRouter.post("/deletemember", requireAuth, DeleteFromGroup);
editorRouter.post("/deletegroup", requireAuth, DeleteGroup);
editorRouter.post("/leavegroup", requireAuth, LeaveGroup);
editorRouter.get("/group/:id" , requireAuth, GetGroup );


editorRouter.get('/friends', requireAuth, GetFriends);
editorRouter.post('/send-friend-request', requireAuth, SendFriendRequest);
editorRouter.get("/users", requireAuth, GetUsers);
editorRouter.get('/friend-requests', requireAuth, GetFriendRequests);
editorRouter.get('/sent-requests', requireAuth, GetSentRequests);
editorRouter.post("/cancel-request", requireAuth, CancelRequest);
editorRouter.post("/reject-request", requireAuth, RejectRequest);
editorRouter.post( "/unfriend", requireAuth, Unfriend );
editorRouter.get("/friend/:id", requireAuth, GetFriend);



// editorRouter.post("/fetchgroupmessage", requireAuth, FetchGroupMessage);
// editorRouter.post("/group_message", requireAuth, GroupMessageCont);
// editorRouter.post("/create-story", CreateStory);
// editorRouter.get("/fetch-story", FetchStory);
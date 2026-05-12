import express from "express";
export const chatRouter = express.Router();
import { requireAuth } from "../auth/middlewire.js";
import { AddToGroup, CreateGroup,  CreateStory, DeleteFromGroup, DeleteGroup, 
            FetchGroupMembers, FetchGroupMessage, FetchGroups, fetchMessage, FetchStory, FetchUsers, GroupMessageCont, LeaveGroup, sendGroupMessage, sendMessage } from "./controller.js";
import { CancelRequest, ChatTest, GetFriendRequests, GetFriends, GetSentRequests, GetUsers, RejectRequest, SendFriendRequest, Unfriend } from "./controller2.js";



chatRouter.post("/fetch-message", requireAuth, fetchMessage);
chatRouter.post("/send-message", requireAuth, sendMessage);
chatRouter.post("/send-group-message", requireAuth, sendGroupMessage);
chatRouter.get("/fetch-users", requireAuth, FetchUsers);
chatRouter.post("/create-group", requireAuth, CreateGroup);
chatRouter.get("/fetch-groups", requireAuth, FetchGroups);
chatRouter.post("/add-to-group", requireAuth, AddToGroup);
chatRouter.post("/fetch-group-members", requireAuth, FetchGroupMembers);
chatRouter.post("/remove-from-group", requireAuth, DeleteFromGroup);
chatRouter.post("/delete-group", requireAuth, DeleteGroup);
chatRouter.post("/leave-group", requireAuth, LeaveGroup);
chatRouter.get("/fetch-group-message/:id", requireAuth, FetchGroupMessage);
chatRouter.post("/group_message", requireAuth, GroupMessageCont);
chatRouter.post("/create-story", CreateStory);
chatRouter.get("/fetch-story", FetchStory);
chatRouter.get('/friends', requireAuth, GetFriends);
chatRouter.post('/send-friend-request', requireAuth, SendFriendRequest);
chatRouter.get("/users", requireAuth, GetUsers );
chatRouter.get('/friend-requests', requireAuth, GetFriendRequests);
chatRouter.get('/sent-requests', requireAuth, GetSentRequests );
chatRouter.post("/cancel-request", requireAuth, CancelRequest);
chatRouter.post("/reject-request", requireAuth, RejectRequest);
chatRouter.get("/test", ChatTest);
chatRouter.post( "/unfriend", requireAuth, Unfriend )

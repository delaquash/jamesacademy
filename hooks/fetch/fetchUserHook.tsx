import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { useCallback, useEffect, useState } from "react";


export const setAuthorizationHeader= async() => {
    const token = await SecureStore.getItemAsync("token");
    if(token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }
}
import React, { useState } from 'react';
import { useLocalStorage } from 'hooks';
import { setInterceptors, setAuthHeader } from 'utils/axios';
import api from 'utils/api';

const LoginContext = React.createContext({
  user: null,
  pagesLoading: false,
  currentPage: '',
  pages: [],
  setCurrentPage: (data: string) => {},
  getPages: async () => {},
  updateItem: async (data: any) => {},
  updateSection: async (data: any) => {},
  addPage: async (pageTitle: string) => {},
  login: async (email: string, password: string) => {},
  register: async (firstName: string, lastName: string, email: string, password: string) => {},
  logout: () => {}
});
export { LoginContext };

const LoginContextContainer = (props: any) => {
  /* eslint-disable-next-line */
  const [accessToken, setAccessToken] = useLocalStorage('access-token', undefined, (token: string | null) => setAuthHeader(`Barear ${token}`));
  const [user, setUser] = useLocalStorage('user', undefined);
  const [pages, setPages] = useState([]);
  const [pagesLoading, setPagesLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState('');
  /**
   * @return An error object or `undefined` if suceed
   */
  const getPages = async (): Promise<any> => {
    setPagesLoading(true);
    try{ 
      const result = await api.getPages();
      if (result.success) {
        setPages(result.data);
      }
      setPagesLoading(false);
    } catch (err) {
      setPagesLoading(false);
      return err;
    }
  }
  
  const addPage = async (data: any): Promise<any> => {
    setPagesLoading(true);
    try{ 
      const result = await api.addPage(data);
      if (result.success) {
        getPages();
      }
      setPagesLoading(false);
    } catch (err) {
      setPagesLoading(false);
      return err;
    }
  }

  const loginUser = async (email: string, password: string): Promise<any> => {
    if (!email || !password) return 'Email or password is empty';
    try{ 
      const result = await api.loginUser({ email, password });
      const token = result.data.data.token.access_token;
      if(token) {
        setAccessToken(token);
        setUser(result.data.data.user);
        return 'Success';
      } else {
        return 'There was a problem with login';
      }
    } catch (err) {
      return err;
    }
  }

  const registerUser = async (firstName: string, lastName: string, email: string, password: string): Promise<any> => {
    if (!firstName || !lastName || !email || !password) return 'Email or password is empty';
    try{ 
      const result = await api.registerUser({ firstName, lastName, email, password });
      const token = result.data.data.token.access_token;
      if(token) {
        setAccessToken(token);
        setUser(result.data.data.user);
        return 'Success';
      } else {
        return 'There was a problem with login';
      }
    } catch (err) {
      return err;
    }
  }

  const updateSection = async (data: any): Promise<any> => {
    const form = new FormData();
    form.append("id", data.id);
    form.append("pageType", '');
    form.append("type", data.type);
    form.append("title", JSON.stringify(data.title));
    form.append("description", JSON.stringify(data.description));
    form.append("subTitle", data.subTitle);
    form.append("action", data.action);
    form.append("img", data.img);
    try { 
      const result = await api.addSection(form);
      if (result.success) {
        getPages();
      }
    } catch (err) {
      return err;
    }
  }
  const updateItem = async (data: any): Promise<any> => {
    const form = new FormData();
    form.append("id", data.id);
    form.append("sectionType", '');
    form.append("title", data.title);
    form.append("description", data.description);
    form.append("value", data.value ? data.value : 0);
    form.append("action", data.action);
    form.append("img", data.img);
    try { 
      const result = await api.addItem(form);
      if (result.success) {
        getPages();
      }
    } catch (err) {
      return err;
    }
  }

  const logoutUser = () => {
    setUser(undefined);
    setAccessToken(undefined);
  }

  setInterceptors(logoutUser);

  return (
    <LoginContext.Provider
      value={{
        user,
        pagesLoading,
        pages,
        currentPage,
        login: loginUser,
        logout: logoutUser,
        register: registerUser,
        getPages,
        addPage,
        updateItem,
        updateSection,
        setCurrentPage
      }}
    >
      { props.children }
    </LoginContext.Provider>
  )
}

export default LoginContextContainer;

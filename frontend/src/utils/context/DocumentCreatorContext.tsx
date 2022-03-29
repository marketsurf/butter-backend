import React, { ReactNode, useEffect, useReducer } from 'react';
import { createContext } from 'react';

type defaultStateType = {
  documentType: string;
  pdfUrl: string;
  content: string[];
};

const defaultState: defaultStateType = {
  documentType:
    typeof window !== 'undefined'
      ? localStorage.getItem('documentType') || ''
      : '',
  pdfUrl:
    typeof window !== 'undefined' ? localStorage.getItem('pdfUrl') || '' : '',
  content:
    typeof window !== 'undefined'
      ? JSON.parse(localStorage.getItem('content') || '[]')
      : JSON.parse('[]'),
};

interface DocumentCreatorContextType {
  documentType: string;

  content: string[];
  pdfUrl: string;
  setDocumentType: (documentType: string) => void;

  setContent: (content: string[]) => void;
}

const actions = {
  SET_DOCUMENT_TYPE: 'SET_DOCUMENT_TYPE',

  SET_CONTENT: 'SET_CONTENT',
};

// Create reducer
const documentReducer = (state: defaultStateType, action: any) => {
  const { type, payload } = action;

  switch (type) {
    case 'SET_DOCUMENT_TYPE':
      return {
        ...state,
        documentType: payload,
      };
    case 'SET_CONTENT':
      return {
        ...state,
        content: payload,
      };

    default:
      return state;
  }
};

export const DocumentCreatorContext =
  createContext<DocumentCreatorContextType>(defaultState);

// Create Provider
const DocumentCreatorProvider = ({ children }: { children: ReactNode }) => {
  // use reducer
  const [state, dispatch] = useReducer(documentReducer, defaultState);

  useEffect(() => {
    localStorage.setItem('documentType', state.documentType);
    localStorage.setItem('content', JSON.stringify(state.content));
  }, [state]);

  const { documentType, content } = state;

  // value
  const value = {
    documentType,

    content,
    setDocumentType: (documentType: string) => {
      dispatch({
        type: actions.SET_DOCUMENT_TYPE,
        payload: documentType,
      });
    },
    setContent: (content: string[]) => {
      dispatch({
        type: actions.SET_CONTENT,
        payload: content,
      });
    },
  };

  return (
    <DocumentCreatorContext.Provider value={value}>
      {children}
    </DocumentCreatorContext.Provider>
  );
};

export default DocumentCreatorProvider;

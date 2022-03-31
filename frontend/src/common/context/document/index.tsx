import React, { createContext, ReactNode, useEffect, useReducer } from 'react';

interface DocumentState {
  documentContent: string[];
  documentType: string;
  setDocumentContent: (documentContent: string[]) => void;
  setDocumentType: (documentType: string) => void;
}

export enum ActionType {
  SET_DOCUMENT_CONTENT = 'setDocumentContent',
  SET_DOCUMENT_TYPE = 'setDocumentType',
}

export interface SetDocumentContent {
  type: ActionType.SET_DOCUMENT_CONTENT;
  payload: Array<string>;
}

export interface SetDocumentType {
  type: ActionType.SET_DOCUMENT_TYPE;
  payload: string;
}

export type DocumentActions = SetDocumentContent | SetDocumentType;

const initialState: DocumentState = {
  documentContent:
    typeof window !== 'undefined'
      ? JSON.parse(localStorage.getItem('documentContent') || '[]')
      : JSON.parse('[]'),
  documentType:
    typeof window !== 'undefined'
      ? localStorage.getItem('documentType') || ''
      : '',
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setDocumentContent: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setDocumentType: () => {},
};

const documentReducer = (state: DocumentState, action: DocumentActions) => {
  switch (action.type) {
    case 'setDocumentContent':
      return { ...state, documentContent: action.payload };
    case 'setDocumentType':
      return { ...state, documentType: action.payload };
    default:
      return state;
  }
};

export const DocumentContext = createContext<DocumentState>(initialState);

interface DocumentProviderProps {
  children: ReactNode;
}

const DocumentProvider = ({ children }: DocumentProviderProps) => {
  const [state, dispatch] = useReducer(documentReducer, initialState);

  useEffect(() => {
    localStorage.setItem('documentType', state.documentType);
    localStorage.setItem(
      'documentContent',
      JSON.stringify(state.documentContent),
    );
  }, [state.documentContent, state.documentType]);

  const setDocumentContent = (documentContent: string[]) => {
    dispatch({
      type: ActionType.SET_DOCUMENT_CONTENT,
      payload: documentContent,
    });
  };

  const setDocumentType = (documentType: string) => {
    dispatch({
      type: ActionType.SET_DOCUMENT_TYPE,
      payload: documentType,
    });
  };

  const value = {
    documentContent: state.documentContent,
    documentType: state.documentType,
    setDocumentContent,
    setDocumentType,
  };

  return (
    <DocumentContext.Provider value={value}>
      {children}
    </DocumentContext.Provider>
  );
};

export default DocumentProvider;

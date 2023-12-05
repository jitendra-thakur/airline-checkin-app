import {gql} from 'apollo-angular'

const GET_LABELS = gql`
  query GetLabels($language: String!) {
    labels(language: $language) {
      key
      value
    }
  }
`;

const CHECKIN = gql`
  mutation Checkin($bookingCode: String!, $familyName: String!) {
    checkin(bookingCode: $bookingCode, familyName: $familyName) {
      status
      message
    }
  }
`;

export {GET_LABELS, CHECKIN}
import { contacts } from './contacts';
import telerivet from './config/telerivet';

const importContacts = async () => {
  contacts.forEach(contact => {
    telerivet.importContacts(
      {
        contacts: [contact],
        add_group_ids: ['CG760b92328edaf619'],
      },
      (err, res) => {
        if (err) {
          console.log(err);
        } else {
          console.log(res);
        }
      }
    );
  });
};

export default importContacts;

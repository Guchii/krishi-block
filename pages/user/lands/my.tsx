import { useDisclosure, Wrap, WrapItem } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';

import Card from '../../../components/Card';
import ViewDetail from '../../../components/ViewLand';
import useWeb3Store from '../../../utils/web3store';

const Home: NextPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalLand, setModalLand] = useState<Partial<Land>>({});
  const [lands, setlands] = useState<any[]>([]);
  const contract = useWeb3Store((state) => state.contract);
  const connectedAccount = useWeb3Store((state) => state.connectedAccount);
  const myLands = useQuery(
    ['lands', 'my'],
    async () => {
      const lands = await contract?.paginateLands(6, 1);
      return lands;
    },
    {
      onSuccess: (data) => {
        console.log(data);
        setlands(
          data
            .map((land: any) => {
              if (parseInt(JSON.parse(land.area)) == 0) {
                return null;
              }
              return land;
            })
            .filter((land: any) => land != null)
        );
      },
      onError: (err) => {
        console.log(err);
      },
    }
  );
  return (
    <>
      <Wrap>
        {lands.map((land, i) => (
            <WrapItem key={i}>
              <Card
                land={land}
                openModal={(land) => {
                  setModalLand(land);
                  onOpen();
                }}
              />
            </WrapItem>
        ))}
      </Wrap>
      <ViewDetail data={modalLand} isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default Home;

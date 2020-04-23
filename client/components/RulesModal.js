import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Modal, Button, Header, Divider, Table } from "semantic-ui-react";
import { Card } from "../components";

const RulesModal = ({ open }) => {
  const [isOpen, toggleOpen] = useState(false);
  const history = useHistory();
  const handleClose = () => {
    toggleOpen(false);
    history.goBack();
  };
  useEffect(() => {
    toggleOpen(open);
  }, []);
  return (
    <Modal open={isOpen} onClose={handleClose} dimmer="blurring">
      <Modal.Header>
        <Header textAlign="center" content="How to Play" size="large" />
      </Modal.Header>
      <Modal.Content scrolling>
        <Header>The goal of the game is to find sets!</Header>
        <Header content="A set is three cards that are either all the same or all different in each of these four categories:" />
        <Table id="categories-table" columns={4} textAlign="center">
          <Table.Header>
            <Table.Row>
              <Table.Cell>
                <Header as="h3" content="Color" />
              </Table.Cell>
              <Table.Cell>
                <Header as="h3" content="Fill" />
              </Table.Cell>
              <Table.Cell>
                <Header as="h3" content="Shape" />
              </Table.Cell>
              <Table.Cell>
                <Header as="h3" content="Number" />
              </Table.Cell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell>
                <div className="category">
                  {/* Color */}
                  <div>
                    <Card which={0} />
                  </div>
                  <div>
                    <Card which={54} />
                  </div>
                  <div>
                    <Card which={27} />
                  </div>
                </div>
              </Table.Cell>
              <Table.Cell>
                <div className="category">
                  {/* Fill */}
                  <div>
                    <Card which={42} />
                  </div>
                  <div>
                    <Card which={33} />
                  </div>
                  <div>
                    <Card which={51} />
                  </div>
                </div>
              </Table.Cell>
              <Table.Cell>
                <div className="category">
                  {/* Shape */}
                  <div>
                    <Card which={6} />
                  </div>
                  <div>
                    <Card which={0} />
                  </div>
                  <div>
                    <Card which={3} />
                  </div>
                </div>
              </Table.Cell>
              <Table.Cell>
                <div className="category">
                  {/* Number */}
                  <div>
                    <Card which={66} />
                  </div>
                  <div>
                    <Card which={67} />
                  </div>
                  <div>
                    <Card which={68} />
                  </div>
                </div>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
        <Header content="For example, this is a set:" />
        <div className="example-set">
          <Card which={0} /> {/* 0,0,0,0 */}
          <Card which={1} /> {/* 0,0,0,1 */}
          <Card which={2} /> {/* 0,0,0,2 */}
        </div>
        <Header content="These cards are all diamonds, all red, all solid, and all different in number." />
        <Divider section />
        <Header content="This is also a set, because they all differ in all four categories:" />
        <div className="example-set">
          <Card which={19} /> {/* 2 Red Hollow Diamond */}
          <Card which={44} /> {/* 3 Green Hatched Rectangle */}
          <Card which={57} /> {/* 1 Purple Solid Oval */}
        </div>
        <Divider section />
        <Header content="This is NOT a set, because the requirements that they be all different or all the same is only satisfied by three of the four categories." />
        <div className="example-set">
          <Card which={32} /> {/* 3 Green Solid Oval */}
          <Card which={36} /> {/* 1 Green Hatched Diamond */}
          <Card which={34} /> {/* 2 Green Solid Rectangle */}
        </div>
        <Header content="These three cards are all green, all different shapes, and all differ in number. However, the diamond is hatched while the other two cards are solid." />
        <Header content="To make a set, we could replace the hatched diamond with a solid, or we could  replace one of the solids with a hollow. For example, this would be a set:" />
        <div className="example-set">
          <Card which={32} /> {/* 3 Green Solid Oval */}
          <Card which={36} /> {/* 1 Green Hatched Diamond */}
          <Card which={52} /> {/* 2 Green Solid Rectangle */}
        </div>
      </Modal.Content>
      <Modal.Actions>
        <Header as="span" textAlign="left">
          Click three cards to form a set!
        </Header>
        <Button primary onClick={handleClose} content="Got it!" />
      </Modal.Actions>
    </Modal>
  );
};

export default RulesModal;

import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import Link from 'next/link';

export default class Example extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = { isOpen: false };
  }

  toggle() {
    this.setState(prevState => ({ isOpen: !prevState.isOpen }));
  }

  render() {
    const { isOpen } = this.state;
    return (
      <Navbar color="light" light expand="md">
        <Link href="/" passHref>
          <NavbarBrand>WTQ</NavbarBrand>
        </Link>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Words
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  <Link href="/words" passHref>
                    <NavLink>Words</NavLink>
                  </Link>
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                  <Link href="/word/create" passHref>
                    <NavLink>Add a word</NavLink>
                  </Link>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Phrases
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  <Link href="/phrases" passHref>
                    <NavLink>Phrases</NavLink>
                  </Link>
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                  <Link href="/phrase/create" passHref>
                    <NavLink>Add a phrase</NavLink>
                  </Link>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Quotes
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  <Link href="/quotes" passHref>
                    <NavLink>Quotes</NavLink>
                  </Link>
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                  <Link href="/quote/create" passHref>
                    <NavLink>Add a quote</NavLink>
                  </Link>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}

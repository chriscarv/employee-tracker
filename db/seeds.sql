INSERT INTO department
    (name)
VALUES
    ('sales'),
    ('engineering'),
    ('finance'),
    ('legal');

INSERT INTO role
    (title, salary, department_id)
VALUES
('salesperson' 80000, 1),
('lead engineer', 150000, 2),
('software engineer', 120000, 3),
('account manager', 160000, 4),
('accountant', 125000, 5),
('legal team lead', 250000, 6),
('lawyer', 190000, 7);

INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ('mike', 'chan', 1, 2)
    ('ahsley', 'rodriguez', 2, 3)
    ('kevin', 'tupi', 3, 1)
    ('kumal', 'signh', 4, 3)
    ('malia', 'brown', 5, 2)
    ('sarah', 'laurd', 6, 3)
    ('tom', 'allen', 7, 1);
